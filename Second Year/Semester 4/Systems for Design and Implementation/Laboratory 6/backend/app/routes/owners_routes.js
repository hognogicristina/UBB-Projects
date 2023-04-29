module.exports = (app) => {
    const controllerOwner = require("../controllers/owners_controller.js")
    const controllerCats = require("../controllers/cats_controller.js")
    const controllerFood = require("../controllers/foods_controller.js")
    const controllerFoodCat = require("../controllers/foods_for_cats_controller.js")

    const dbOwner = require("../database/owners_database.js")
    const dbCats = require("../database/cats_database.js")
    const dbFood = require("../database/foods_database.js")

    function gen() {
        dbOwner.countRowsOwner().then((res1) => {
            if (res1 == 0) {
                controllerOwner.genOwner()
                dbOwner.countRowsOwner().then((res2) => {
                    if (res2 == 10) {
                        controllerCats.genCat()
                        dbCats.countRowsCats().then((res3) => {
                            if (res3 == 15) {
                                controllerFood.genFood()
                                dbFood.countRowsFood().then((res4) => {
                                    if (res4 == 10) {
                                        controllerFoodCat.genFoodCat()
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    gen()

    app.get('/owners', controllerOwner.getOwner, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.get('/owners/:id', controllerOwner.getOneOwner, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.post('/owners_add', controllerOwner.createOwner, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.delete('/owners_delete/:id', controllerOwner.deleteOwner, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.put('/owners_update/:id', controllerOwner.updateOwner, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.get('/owners_statistic', controllerOwner.getStatistics, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.post('/owners/:id/cats_list', controllerOwner.changeOwnerIdOfCats, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.post('/owners/:id/cats_create', controllerOwner.createCatForOwner, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
}