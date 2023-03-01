// In routes we define the link for the operations and the controller that will handle the request

module.exports = (app) => {
    const controller = require("../controllers/controller.js")

    controller.gen()

    app.get('/cats', controller.get)
    app.post('/cats/add', controller.create)
    app.delete('/cats/delete/:id', controller.delete)
    app.put('/cats/update/:id', controller.update)
}