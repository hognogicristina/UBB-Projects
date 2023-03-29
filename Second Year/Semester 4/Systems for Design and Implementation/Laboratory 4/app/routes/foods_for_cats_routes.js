module.exports = (app) => {
    const controllerFoodCat = require("../controllers/foods_for_cats_controller.js")

    app.get('/foodcat', controllerFoodCat.getFoodCat)
    app.get('/foodcat/:id', controllerFoodCat.getOneFoodCat)
    app.post('/foodcat_add', controllerFoodCat.createFoodCat)
    app.delete('/foodcat_delete/:id', controllerFoodCat.deleteFoodCat)
    app.put('/foodcat_update/:id', controllerFoodCat.updateFoodCat)
}