const cat = require('../models/cats_model.js')
const owner = require('../models/owners_model.js')
const Sequelize = require('sequelize')
require('./database.js')


async function getCats() {
    return cat.findAll()
}

async function getOneCatById(id) {
    return cat.findOne({ where: { id: id } })
}

async function countRowsCats() {
    return cat.count()
}

async function addCat(cats) {
    return cat.create(cats)
}

async function deleteCat(id) {
    return cat.destroy({ where: { id: id } })
}

async function updateCat(cats) {
    return cat.update(
        { name: cats.name, age: cats.age, color: cats.color, breed: cats.breed, weight: cats.weight, ownerId: cats.ownerId },
        { where: { id: cats.id } })
}

async function filterCatsByWeight(weight) {
    return cat.findAll({ where: { weight: { [Sequelize.Op.gt]: weight } } })
}

async function getByTypeCat(typeName, type) {
    return cat.findAll({ where: { [typeName]: type } })
}

async function getStatisticReportBreed(breed) {
    cat.belongsTo(owner, { foreignKey: 'ownerId' })

    const result = await cat.findAll({
        attributes: ['id', 'name', 'age', 'color', 'breed', 'weight', 'ownerId', [Sequelize.fn('AVG', Sequelize.col('owner.age')), 'avgAge']],
        include: [{
            model: owner,
            attributes: ['firstName']
        }],
        where: { breed: breed },
        group: ['owner.firstName']
    })

    return result
}

module.exports = {
    getCats: getCats,
    getOneCatById: getOneCatById,
    countRowsCats: countRowsCats,
    addCat: addCat,
    deleteCat: deleteCat,
    updateCat: updateCat,
    filterCatsByWeight: filterCatsByWeight,
    getByTypeCat: getByTypeCat,
    getStatisticReportBreed: getStatisticReportBreed
}