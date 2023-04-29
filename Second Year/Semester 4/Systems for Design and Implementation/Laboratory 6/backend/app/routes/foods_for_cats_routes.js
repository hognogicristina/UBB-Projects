module.exports = (app) => {
    const controllerFoodCat = require("../controllers/foods_for_cats_controller.js")

    app.get('/foodcat', controllerFoodCat.getFoodCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.get('/foodcat/:id', controllerFoodCat.getOneFoodCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.post('/foodcat_add', controllerFoodCat.createFoodCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.delete('/foodcat_delete/:id', controllerFoodCat.deleteFoodCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.put('/foodcat_update/:id', controllerFoodCat.updateFoodCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
}