module.exports = (app) => {
    const controllerFood = require("../controllers/foods_controller.js")

    app.get('/foods', controllerFood.getFood)
    app.get('/foods/:id', controllerFood.getOneFood)
    app.post('/foods_add', controllerFood.createFood)
    app.delete('/foods_delete/:id', controllerFood.deleteFood)
    app.put('/foods_update/:id', controllerFood.updateFood)
}