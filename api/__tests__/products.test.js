const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");
const agent = request.agent(server)

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