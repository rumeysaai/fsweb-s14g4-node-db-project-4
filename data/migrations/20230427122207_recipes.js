/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('Tarifler', tbl => {
            tbl.increments('tarif_id');
            tbl.string('tarif_adi').notNullable();
            tbl.timestamp('kayit_tarihi').defaultTo(knex.fn.now());
        })
        .createTable('Adimlar', tbl => {
            tbl.increments('adim_id');
            tbl.integer('adim_sirasi', 32).notNullable().unsigned();
            tbl.string('adim_talimati').notNullable();
            tbl.integer('tarif_id', 32)
                .notNullable()
                .unsigned()
                .references('tarif_id')
                .inTable('Tarifler')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('Icindekiler', tbl => {
            tbl.increments('icindekiler_id');
            tbl.string('icindekiler_adi');
        })
        .createTable('Icindekiler_Adimlar', tbl => {
            tbl.increments();
            tbl.integer('icindekiler_id')
                .notNullable()
                .unsigned()
                .references('icindekiler_id')
                .inTable('Icindekiler')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('tarif_id')
                .notNullable()
                .unsigned()
                .references('tarif_id')
                .inTable('Tarifler')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('adim_id')
                .notNullable()
                .unsigned()
                .references('adim_id')
                .inTable('Adimlar')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('miktar', 64)
                .notNullable()
                .unsigned();
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Icindekiler_Adimlar')
                      .dropTableIfExists('Icindekiler')
                      .dropTableIfExists('Adimlar')
                      .dropTableIfExists('Tarifler')

};
