const Owner = require('../models/owners_model.js')
const Cat = require('../models/cats_model.js')

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
    return Owner.findAll()
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
        { firstName: owner.firstName, lastName: owner.lastName, address: owner.address, phone: owner.phone, email: owner.email, age: owner.age },
        { where: { id: owner.id } }
    )
}

async function getByTypeOwner(typeName, type) {
    return Owner.findAll({ where: { [typeName]: type } })
}

async function getStatisticReport() {
    Owner.hasMany(Cat, { foreignKey: 'ownerId' })
    Cat.belongsTo(Owner)

    const result = await Owner.findAll({
        attributes: ['id', 'firstName', 'lastName', 'address', 'phone', 'email', 'age', [sequelize.fn('AVG', sequelize.col('Cats.age')), 'avgAge']],
        include: [{
            model: Cat,
            attributes: [],
            as: 'Cats'
        }],
        group: ['firstName'],
        order: [[sequelize.fn('AVG', sequelize.col('Cats.age')), 'ASC']]
    })

    return result
}

async function changeOwnerIdOfCats(id_owner, cats_list) {
    id_owner = parseInt(id_owner)
    const cats = await Cat.findAll({ where: { id: cats_list } })
    let list = []

    cats.forEach(cat => {
        cat.ownerId = id_owner
        cat.save()
        list.push(cat.dataValues)
    })

    return list
}

async function createCatForOwner(id_owner, cats_list) {
    const id_cats = cats_list.cats_list.map(cat => cat.id)
    const catsExists = await Cat.findAll({ where: { id: id_cats } })
    
    let list = []

    cats_list.cats_list.forEach(cat => {
        let catExists = catsExists.find(c => c.dataValues.id == cat.id)
        if (catExists) {
            catExists.ownerId = id_owner
            catExists.save()
            list.push(catExists.dataValues)
        } else {
            let newCat = new Cat({ id: cat.id, name: cat.name, age: cat.age, color: cat.color, breed: cat.breed, weight: cat.weight, ownerId: id_owner })
            newCat.save()
            list.push(newCat.dataValues)
        }
    })

    return list
}

module.exports = {
    getOwners: getOwners,
    getOneOwnerById: getOneOwnerById,
    countRowsOwner: countRowsOwner,
    addOwner: addOwner,
    deleteOwner: deleteOwner,
    updateOwner: updateOwner,
    getByTypeOwner: getByTypeOwner,
    getStatisticReport: getStatisticReport,
    changeOwnerIdOfCats: changeOwnerIdOfCats,
    createCatForOwner: createCatForOwner
}
