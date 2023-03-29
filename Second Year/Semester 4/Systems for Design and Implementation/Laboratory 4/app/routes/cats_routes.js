module.exports = (app) => {
    const controllerCat = require("../controllers/cats_controller.js")

    app.get('/cats', controllerCat.getCat)
    app.get('/cats/:id', controllerCat.getOneCat)
    app.post('/cats_add', controllerCat.createCat)
    app.delete('/cats_delete/:id', controllerCat.deleteCat)
    app.put('/cats_update/:id', controllerCat.updateCat)
    app.get('/cats_filter/:weight', controllerCat.filterCat)
    app.get('/cats_statistic/:breed', controllerCat.getStatisticsBreed)
}