/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments();
    table.string("seller");
    table.integer("sellerID")
    table.string("buyer");
    table.string("buyerID");
    table.string("itemName");
    table.decimal("itemPrice");
    // table.decimal("item_price_update");
    table.text("description");
    table.string("category");
    table.dateTime("postTime");
    table.dateTime("editTime");
    table.integer("visitCount");
    table.integer("searchCount");
    table.string("photo1Name");
    table.string("photo2Name");
    table.string("photo3Name");
    // table.string("username");
    table.string("status");
    // table
    //   .integer("usersId")
    //   .unsigned()
    //   .notNullable()
    //   .references("id")
    //   .inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("items");
};
