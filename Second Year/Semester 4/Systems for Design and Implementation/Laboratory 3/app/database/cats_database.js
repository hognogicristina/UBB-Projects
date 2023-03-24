const Cat = require('../models/cats_model.js')
const Owner = require('../models/owners_model.js')

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('meow', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
})

sequelize.authenticate()

async function getCats() {
    return Cat.findAll()
}

async function getOneCatById(id) {
    return Cat.findOne({ where: { id: id } })
}

async function countRowsCats() {
    return Cat.count()
}

async function addCat(cat) {
    return Cat.create(cat)
}

async function deleteCat(id) {
    return Cat.destroy({ where: { id: id } })
}

async function updateCat(cat) {
    return Cat.update(
        { name: cat.name, age: cat.age, color: cat.color, breed: cat.breed, weight: cat.weight, ownerId: cat.ownerId }, 
        { where: { id: cat.id } })
}

async function filterCatsByWeight(weight) {
    return Cat.findAll({ where: { weight: { [Sequelize.Op.gt]: weight } } })
}

async function getByTypeCat(typeName, type) {
    return Cat.findAll({ where: { [typeName]: type } })
}

async function getStatisticReport() {
    // first name of the owner of all cats
    let firstNames = await Owner.findAll({ attributes: ['firstName'] })
    
    // instead of owner id, we will use owner first name and we sort it by their owner id
    let cats = await Cat.findAll({ attributes: ['ownerId'] })
    cats.forEach(cat => {
        cat.ownerId = firstNames[cat.ownerId - 1].firstName
    })

    return cats
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
    getStatisticReport: getStatisticReport
}