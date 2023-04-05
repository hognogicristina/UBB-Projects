const cat = require('../models/cats_model.js')
const owner = require('../models/owners_model.js')
const mysql2 = require('mysql2')

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('bo8dhdnecmi9kqgy6joa', 'utjidt7rdyxmke4r', 'YRtSHxz0xzXW2m5UY4rT', {
    host: 'bo8dhdnecmi9kqgy6joa-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: 3306
})

sequelize.authenticate()

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
        attributes: ['id', [sequelize.fn('AVG', sequelize.col('owner.age')), 'avgAge']],
        include: [{
            model: owner,
            attributes: ['firstName', 'lastName']
        }],
        where: { breed: breed },
        group: ['owner.firstName'],
        order: [[sequelize.col('owner.firstName'), 'ASC']]
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