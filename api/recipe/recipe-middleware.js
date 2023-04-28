const Recipe = require('./recipe-model');

const checkRecipeId = async(req, res, next)=>{
    try {
        const recipe = await Recipe.getById(req.params.tarif_id)
        if(!recipe){
            res.status(404).json({message: `tarif_id ${req.params.tarif_id} id li şema bulunamadı`})
        }
        else{
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports={
    checkRecipeId
}