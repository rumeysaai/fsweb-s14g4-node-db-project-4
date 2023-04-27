/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Icindekiler_Adimlar').truncate()
  await knex('Tarifler').truncate()
  await knex('Adimlar').truncate()
  await knex('Icindekiler').truncate()

  await knex('Tarifler').insert([
    {tarif_id: 1, tarif_adi: 'Spagetti Bolonez', kayit_tarihi:'2021-01-01 08:23:19.120'},
    {tarif_id: 2, tarif_adi: 'Mozerella Pizza', kayit_tarihi:'2021-01-01 08:23:19.120'},
  ]);
  await knex('Adimlar').insert([
    {
      adim_id: 1,
      adim_sirasi: 1,
      adim_talimati: "Büyük bir tencereyi orta ateşe koyun",
      tarif_id:1
    },
    {
      adim_id: 2,
      adim_sirasi: 2,
      adim_talimati: "1 yemek kaşığı zeytinyağı ekleyin",
      tarif_id:1
    }
  ])
  await knex('Icindekiler').insert([
    {
      icindekiler_id:1,
      icindekiler_adi:'zeytinyağı'
    }
  ])
  await knex('Icindekiler_Adimlar').insert([
    {
      adim_id:1,
      icindekiler_id:1,
      tarif_id:1,
      miktar:1
    }
  ])
};
