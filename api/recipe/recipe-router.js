const router = require('express').Router();
const RecipeModel = require('./recipe-model');
const mw = require('./recipe-middleware');


router.get('/:tarif_id', mw.checkRecipeId, (req, res, next) => {
    const {tarif_id} = req.params;

    RecipeModel.getById(tarif_id)
    .then(tarif=>{
        res.json(tarif);
    })
    .catch(next);
})


module.exports = router;