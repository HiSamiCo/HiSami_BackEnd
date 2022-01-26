const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");
const agent = request.agent(server);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjotMSwiZW1haWwiOiJmYWtlQGZha2UuY29tIiwicGFzc3dvcmQiOiIkMmIkMDgkSmtWU0poM3cxREpGMzRSUU8vY2hjZU12UGVNdUFib2VSM28vOFQyUjduaHhiSUNvL2pqYTYiLCJpYXQiOjE2NDIzNjQxNzAsImV4cCI6MTY0MjQ1MDU3MH0.WZOc9WgerI1Dh96eP9HYKQvW2b9pEChGAlit9gwC6cM";

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

describe("GET /api/carts", () => {
  it("returns user carts", async () => {
    const expectedCart = [
      {
        product_name: "Monstera Clay Earings",
        image:
          "https://live.staticflickr.com/65535/51561477070_77b09350ba_b.jpg",
        cart_item_id: -1,
        user_id: -1,
        product_id: -1,
        quantity: 1000,
        price: 20,
      },
      {
        product_name: "Wildflower Screen Print Clay Earings",
        image:
          "https://live.staticflickr.com/65535/51561243964_7c0eb0c4b4_b.jpg",
        cart_item_id: -2,
        user_id: -1,
        product_id: -2,
        quantity: 1,
        price: 20,
      },
    ];
    const cart = await agent.get("/api/carts").set("authorization", token);
    expect(cart.body).toMatchObject(expectedCart);
  });
});

describe("POST /api/carts/create", () => {
  it("returns the created cart item", async () => {
    const expectedItem = {
      cart_item_id: 1,
      user_id: -1,
      product_id: -1,
      quantity: 2,
    };
    const createdItem = await agent
      .post("/api/carts/create")
      .set("authorization", token)
      .send({ quantity: 2, product_id: -1 });
    expect(createdItem.body).toMatchObject(expectedItem);
  });
});
