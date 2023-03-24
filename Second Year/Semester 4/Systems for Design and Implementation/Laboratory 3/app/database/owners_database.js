const Owner = require('../models/owners_model.js')
const Cats = require('../models/cats_model.js')

const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize('meow', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
})

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error))

async function getOwners() {
    return Owner.findAll();
}

async function getOneOwnerById(id) {
    return Owner.findOne({ where: { id: id } })
}

async function countRowsOwner() {
    return Owner.count()
}

async function addOwner(owner) {
    return Owner.create(owner)
}

async function deleteOwner(id) {
    return Owner.destroy({ where: { id: id } })
}

async function updateOwner(owner) {
    return Owner.update(
        { firstName: owner.firstName, lastName: owner.lastName, address: owner.address, phone: owner.phone, email: owner.email },
        { where: { id: owner.id } }
    )
}

async function getByTypeOwner(typeName, type) {
    return Owner.findAll({ where: { [typeName]: type } })
}

module.exports = {
    getOwners: getOwners,
    getOneOwnerById: getOneOwnerById,
    countRowsOwner: countRowsOwner,
    addOwner: addOwner,
    deleteOwner: deleteOwner,
    updateOwner: updateOwner,
    getByTypeOwner: getByTypeOwner
}
