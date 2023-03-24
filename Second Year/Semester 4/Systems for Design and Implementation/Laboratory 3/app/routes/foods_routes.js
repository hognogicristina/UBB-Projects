module.exports = (app) => {
    const controllerFood = require("../controllers/foods_controller.js")

    app.get('/foods', controllerFood.getFood)
    app.get('/foods/:id', controllerFood.getOneFood)
    app.post('/foods/add', controllerFood.createFood)
    app.delete('/foods/delete/:id', controllerFood.deleteFood)
    app.put('/foods/update/:id', controllerFood.updateFood)
}