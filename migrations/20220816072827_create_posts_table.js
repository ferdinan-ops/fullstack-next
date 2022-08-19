/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Code membuat tabel baru dengan nama posts
  return knex.schema.createTable("posts", (table) => {
    table.increments(); // membuat id dan increments
    table.string("title"); // membuat kolom title dgn tipe data string
    table.text("content"); // membuat kolom content dgn tipe data text
    // tipe data timestamps ini akan membuat 2 kolom yaitu createdAt (waktu dibuat) dan updatedAt (waktu diupdate). Untuk nilainya dapat kita buat true, true agar kita tidak perlu lg membuat code untuk mengambil waktu sekarang.
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
