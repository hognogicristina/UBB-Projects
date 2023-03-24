module.exports = (app) => {
    const controllerCat = require("../controllers/cats_controller.js")

    app.get('/cats', controllerCat.getCat)
    app.get('/cats/:id', controllerCat.getOneCat)
    app.post('/cats/add', controllerCat.createCat)
    app.delete('/cats/delete/:id', controllerCat.deleteCat)
    app.put('/cats/update/:id', controllerCat.updateCat)
    app.get('/cats/filter/:weight', controllerCat.filterCat)
    app.get('/cats/statistic/report', controllerCat.getStatistics)
}