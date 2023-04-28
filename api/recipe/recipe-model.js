const db = require('../../data/db-config');

async function getById(tarif_id) {
    /* 
        select * from Tarifler t
        left join Adimlar a on a.tarif_id = t.tarif_id
        left join Icindekiler_Adimlar ia on  ia.adim_id = a.adim_id 
        where t.tarif_id = 1
    */
    const recipes = await db('Tarifler as t')
        .leftJoin('Adimlar as a', 't.tarif_id', 'a.tarif_id')
        .leftJoin('Icindekiler_Adimlar as ia', 'a.adim_id', 'ia.adim_id')
        .leftJoin('Icindekiler as i', 'ia.icindekiler_id', 'i.icindekiler_id')
        .where('t.tarif_id', tarif_id);

    if (recipes.length === 0) {
        return null;
    }
    let responseData = {

        "tarif_id": parseInt(tarif_id),
        "tarif_adi": recipes[0].tarif_adi,
        "kayit_tarihi": recipes[0].kayit_tarihi,
        "adimlar": []
    };

    if (recipes[0].adim_id === null) {
        return responseData
    }
    recipes.forEach((item) => {

        let step = responseData.adimlar.find(s =>
            s.adim_id = item.adim_id
        )
        let ingredients = {
            
                "icindekiler_id": item.icindekiler_id,
                "icindekiler_adi": item.icindekiler_adi,
                "miktar": item.miktar
        }
        if (!step) {
            responseData.adimlar.push(
                {
                    "adim_id": item.adim_id,
                    "adim_sirasi": item.adim_sirasi,
                    "adim_talimati": item.adim_talimati,
                    "icindekiler": [ingredients]
                }
            )
        }
        else {
            step.icindekiler.push(ingredients)
        }

    });


    return responseData;


}

module.exports = {
    getById,
}