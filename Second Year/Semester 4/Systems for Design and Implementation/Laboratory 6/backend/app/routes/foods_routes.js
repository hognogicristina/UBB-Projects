module.exports = (app) => {
    const controllerFood = require("../controllers/foods_controller.js")

    app.get('/foods', controllerFood.getFood
    , (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.get('/foods/:id', controllerFood.getOneFood
    , (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.post('/foods_add', controllerFood.createFood
    , (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.delete('/foods_delete/:id', controllerFood.deleteFood
    , (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.put('/foods_update/:id', controllerFood.updateFood
    , (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
}