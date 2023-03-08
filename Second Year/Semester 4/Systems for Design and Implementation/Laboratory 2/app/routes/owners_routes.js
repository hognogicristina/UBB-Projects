module.exports = (app) => {
    const controller = require("../controllers/owners_controller.js")
    const controllerCats = require("../controllers/cats_controller.js")
    const db = require("../database/owners_database.js")
    const dbCats = require("../database/cats_database.js")

    function gen() {
        db.countRows().then((res) => {
            if (res == 0) {
                controller.genOwner()
                dbCats.countRows().then((res) => {
                    if (res == 0) {
                        controllerCats.gen()
                    }
                })
            }
        })
    }

    gen()

    app.get('/owners', controller.getOwner)
    app.get('/owners/:id', controller.getOneOwner)
    app.post('/owners/add', controller.createOwner)
    app.delete('/owners/delete/:id', controller.deleteOwner)
    app.put('/owners/update/:id', controller.updateOwner)
}