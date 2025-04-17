test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toBe(parsedUpdateAt);

  expect(responseBody.dependencies.database.version).toBe("16.0");

  expect(parseInt(responseBody.dependencies.database.max_connection)).toBe(100);

  expect(responseBody.dependencies.database.opened_connections).toBeDefined();

  const openedConnection = parseInt(
    responseBody.dependencies.database.opened_connections,
  );

  expect(
    parseInt(responseBody.dependencies.database.opened_connections),
  ).toEqual(1);
});
