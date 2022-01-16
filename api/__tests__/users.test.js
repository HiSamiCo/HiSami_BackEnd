const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");
const agent = request.agent(server)

jest.mock("bcrypt", () => ({
  hashSync: (password) => password
}))

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it("sanity check", () => {
  expect(true).not.toBe(false);
});

describe("server.js", () => {
  it("is the correct testing environment", async () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("GET /api/users", () => {
  it("returns all users", async () => {
    const users = await agent.get("/api/users")
    expect(users).toBeTruthy()
  });
});

const testUser = { password: "password", first_name: "first_name", last_name: "last_name", email: "email@email.com" }
const expected = { 
  ...testUser, 
  admin: false,
  user_id: 1,
}

describe("POST /api/users/create", () => {
  it("returns an added user", async () => {
    const createdUser = await agent.post("/api/users/create").send(testUser)
    expect(createdUser).toBeTruthy()
    console.table(createdUser.body)
    expect(createdUser.body).toMatchObject(expected)
  })
})
