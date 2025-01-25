const request = require("supertest");
const app = require("./app"); // Import aplikasi Express.js

describe("User Authentication API", () => {
  test("Should register a new user", async () => {
    const response = await request(app).post("/api/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });
});
