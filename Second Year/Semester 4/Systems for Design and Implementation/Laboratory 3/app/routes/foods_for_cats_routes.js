module.exports = (app) => {
    const controllerFoodCat = require("../controllers/foods_for_cats_controller.js")

    app.get('/foodcat', controllerFoodCat.getFoodCat)
    app.get('/foodcat/:id', controllerFoodCat.getOneFoodCat)
    app.post('/foodcat/add', controllerFoodCat.createFoodCat)
    app.delete('/foodcat/delete/:id', controllerFoodCat.deleteFoodCat)
    app.put('/foodcat/update/:id', controllerFoodCat.updateFoodCat)
}