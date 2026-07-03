const test = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const http = require("node:http");
const router = require("../src/routes/documentos");

async function startTestServer() {
  const app = express();
  app.use("/api", router);

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  const { port } = server.address();
  return {
    server,
    baseUrl: `http://127.0.0.1:${port}`,
  };
}

async function stopTestServer(server) {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

test("GET /api/documentos/:cpf retorna documentos para CPF válido e matrícula existente", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(
      `${baseUrl}/api/documentos/123.456.789-00?matricula=12345`,
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.documentos));
    assert.ok(body.documentos.some((documento) => documento.tipo === "IR"));
    assert.ok(body.documentos.some((documento) => documento.tipo === "BOLETO"));
  } finally {
    await stopTestServer(server);
  }
});

test("GET /api/documentos/:cpf rejeita CPF inválido", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(
      `${baseUrl}/api/documentos/123?matricula=12345`,
    );
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.success, false);
    assert.match(body.message, /CPF inválido/i);
  } finally {
    await stopTestServer(server);
  }
});

test("GET /api/documentos/:cpf retorna 404 quando a matrícula não existe", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(
      `${baseUrl}/api/documentos/123.456.789-00?matricula=99999`,
    );
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.success, false);
    assert.match(body.message, /matrícula/i);
  } finally {
    await stopTestServer(server);
  }
});

test("GET /api/documentos/:cpf filtra documentos por ano quando informado", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(
      `${baseUrl}/api/documentos/123.456.789-00?matricula=12345&tipo=IR&ano=2024`,
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.documentos));
    assert.equal(body.documentos.length, 1);
    assert.equal(body.documentos[0].tipo, "IR");
    assert.equal(body.documentos[0].ano, "2024");
  } finally {
    await stopTestServer(server);
  }
});

test("GET /api/documentos/:cpf rejeita ano inválido", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(
      `${baseUrl}/api/documentos/123.456.789-00?matricula=12345&ano=abc`,
    );
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.success, false);
    assert.match(body.message, /ano inválido/i);
  } finally {
    await stopTestServer(server);
  }
});
