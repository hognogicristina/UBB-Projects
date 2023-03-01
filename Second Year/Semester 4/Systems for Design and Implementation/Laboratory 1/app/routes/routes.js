module.exports = (app) => {
    var controller = require("../controllers/controller.js")

    app.post('/cats/add', controller.create)

    app.get('/cats/get', controller.get)

    app.put('/cats/update/:id', controller.update)

    app.delete('/cats/delete/:id', controller.delete)

    app.get('/cats', controller.gen)
}