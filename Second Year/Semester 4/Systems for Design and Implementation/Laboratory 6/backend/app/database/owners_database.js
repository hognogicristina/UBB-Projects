const owner = require('../models/owners_model.js')
const cat = require('../models/cats_model.js')
require('./database.js')

async function getOwners() {
    return owner.findAll()
}

async function getOneOwnerById(id) {
    return owner.findOne({ where: { id: id } })
}

async function countRowsOwner() {
    return owner.count()
}

async function addOwner(owners) {
    return owner.create(owners)
}

async function deleteOwner(id) {
    return owner.destroy({ where: { id: id } })
}

async function updateOwner(owners) {
    return owner.update(
        { firstName: owners.firstName, lastName: owners.lastName, address: owners.address, phone: owners.phone, email: owners.email, age: owners.age },
        { where: { id: owners.id } }
    )
}

async function getByTypeOwner(typeName, type) {
    return owner.findAll({ where: { [typeName]: type } })
}

async function getStatisticReport() {
    owner.hasMany(cat, { foreignKey: 'ownerId' })
    cat.belongsTo(owner)

    const result = await owner.findAll({
        attributes: ['id', 'firstName', 'lastName', 'address', 'phone', 'email', 'age', [sequelize.fn('AVG', sequelize.col('cats.age')), 'avgAge']],
        include: [{
            model: cat,
            attributes: [],
            as: 'cats'
        }],
        group: ['firstName'],
        order: [[sequelize.fn('AVG', sequelize.col('cats.age')), 'ASC']]
    })

    return result
}

async function changeOwnerIdOfCats(id_owner, cats_list) {
    id_owner = parseInt(id_owner)
    const cats = await cat.findAll({ where: { id: cats_list } })
    let list = []

    cats.forEach(cats => {
        cats.ownerId = id_owner
        cats.save()
        list.push(cats.dataValues)
    })

    return list
}

async function createCatForOwner(id_owner, cats_list) {
    const id_cats = cats_list.cats_list.map(cats => cats.id)
    const catsExists = await cat.findAll({ where: { id: id_cats } })

    let list = []
    
    cats_list.cats_list.forEach(cats => {
        let catExists = catsExists.find(cat => cat.id === cats.id)

        if (catExists) {
            list.push(changeOwnerIdOfCats(id_owner, cats.id))
        } else {
            let newCat = new cat({ id: cats.id, name: cats.name, age: cats.age, color: cats.color, breed: cats.breed, weight: cats.weight, ownerId: id_owner })
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
