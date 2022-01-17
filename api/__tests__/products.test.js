const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");
const agent = request.agent(server)

const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjotMiwiZW1haWwiOiJmYWtlckBmYWtlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JEprVlNKaDN3MURKRjM0UlFPL2NoY2VNdlBlTXVBYm9lUjNvLzhUMlI3bmh4YklDby9qamE2IiwiaWF0IjoxNjQyMzY1NjMzLCJleHAiOjE2NDI0NTIwMzN9.gtVfXZ7U9hLCWN6V8-A4ootp0GHrcqLX0Ku5s1u2yh8"

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

describe("GET /api/products/category/products", () => {
    const expectedCategoryProducts = [
        {
          category_id: -1,
          category_name: 'Accessories',
          products: [
            {
              product_id: -2,
              product_name: 'Wildflower Screen Print Clay Earings',
              stock: 100,
              details: '',
              price: 20,
              image: 'https://live.staticflickr.com/65535/51561243964_7c0eb0c4b4_b.jpg'
            },
            {
              product_id: -1,
              product_name: 'Monstera Clay Earings',
              stock: 200,
              details: '',
              price: 20,
              image: 'https://live.staticflickr.com/65535/51561477070_77b09350ba_b.jpg'
            }
          ]
        },
        { category_id: -2, category_name: 'Stickers', products: [] },
        { category_id: -3, category_name: 'Home Decor', products: [] }
      ]
    it("returns the products and categories", async () => {
        const categoryProducts = await agent
            .get("/api/products/category/products")
        expect(categoryProducts.status).toBe(200)
        expect(categoryProducts.body).toMatchObject(expectedCategoryProducts)
    })
})

describe("POST /api/products/category", () => {
    it("returns created category", async () => {
        const expectedCategory = { 
            category_name: 'newCategory', 
            category_id: 1 
        }
        const createdCategory = await agent
            .post("/api/products/category")
            .set("authorization", adminToken)
            .send({ category_name: "newCategory" })
        expect(createdCategory.body).toMatchObject(expectedCategory)
    })
})