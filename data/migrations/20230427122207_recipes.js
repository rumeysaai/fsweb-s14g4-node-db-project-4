/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('Recipes',tbl=>{
    tbl.increments('tarif_id');
    tbl.string('tarif_adi').notNullable();
    tbl.timestamp('kayit_tarihi').defaultTo(knex.fn.now());
  })
  .createTable('Steps', tbl=>{
    tbl.increments('adim_id');
    tbl.integer('adim_sirasi',32).notNullable.unsigned();
    tbl.string('adim_talimati').notNullable();
    tbl.integer('tarif_id',32)
        .notNullable()
        .unsigned()
        .references('tarif_id')
        .inTable('Recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
