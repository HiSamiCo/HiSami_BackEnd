exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("email", 200).notNullable().unique();
      users.string("password", 200).notNullable();
      users.string("first_name").notNullable();
      users.string("last_name").notNullable();
      users.boolean("admin").defaultTo(false);
      users.timestamps(false, true);
    })
    .createTable("product_categories", (item) => {
      item.increments("category_id");
      item.string("name").notNullable().unique();
    })
    .createTable("products", (product) => {
      product.increments("product_id");
      product.string("name").notNullable();
      product.integer("quantity");
      product.string("details");
      product.float("price").notNullable();
      product
        .integer("category_id")
        .notNullable()
        .references("category_id")
        .inTable("product_categories")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      product.string("image").notNullable();
    })
    .createTable("users_cart_products", (item) => {
      item.increments("cart_item_id");
      item
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      item
        .integer("product_id")
        .notNullable()
        .references("product_id")
        .inTable("products")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      item.integer("quantity").notNullable();
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("users_cart_products")
    .dropTableIfExists("products")
    .dropTableIfExists("product_categories")
    .dropTableIfExists("users");
};
