module.exports = (app) => {
    const controller = require("../controllers/cats_controller.js")

    app.get('/cats', controller.get)
    app.get('/cats/:id', controller.getOne)
    app.post('/cats/add', controller.create)
    app.delete('/cats/delete/:id', controller.delete)
    app.put('/cats/update/:id', controller.update)
    app.get('/cats/filter/:weight', controller.filter)
}