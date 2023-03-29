const Owner = require("../models/owners_model.js")
const db = require("../database/owners_database.js")

var owners = []

module.exports = {
    genOwner: function () {
        owners = []

        let owner1 = new Owner({ id: 1, firstName: "Oliver", lastName: "Smith", address: "34 Cook Street", phone: 71838750, email: "olism@gmail.com", age: 34 })
        let owner2 = new Owner({ id: 2, firstName: "John", lastName: "Karev", address: "12 Main Street", phone: 71838751, email: "johnykav@yahoo.com", age: 40 })
        let owner3 = new Owner({ id: 3, firstName: "Mary", lastName: "Grey", address: "23 Park Avenue", phone: 71838752, email: "marygrey@gmail.com", age: 34 })
        let owner4 = new Owner({ id: 4, firstName: "Meredith", lastName: "Grey", address: "34 Cook Street", phone: 71838753, email: "mergrey@gmail.com", age: 16 })
        let owner5 = new Owner({ id: 5, firstName: "Alex", lastName: "Karev", address: "12 Main Street", phone: 71838754, email: "karev@yahoo.com", age: 89 })
        let owner6 = new Owner({ id: 6, firstName: "Jose", lastName: "Wilson", address: "23 Park Avenue", phone: 71838755, email: "jo@yahoo.com", age: 35 })
        let owner7 = new Owner({ id: 7, firstName: "Richard", lastName: "Webber", address: "34 Cook Street", phone: 71838756, email: "rich@yahoo.com", age: 89 })
        let owner8 = new Owner({ id: 8, firstName: "Jackson", lastName: "Avery", address: "12 Main Street", phone: 71838757, email: "jack@gmail.com", age: 34 })
        let owner9 = new Owner({ id: 9, firstName: "April", lastName: "Kepner", address: "23 Park Avenue", phone: 71838758, email: "april@yahoo.com", age: 16 })
        let owner10 = new Owner({ id: 10, firstName: "Callie", lastName: "Torres", address: "34 Cook Street", phone: 71838759, email: "callie@gmail.com", age: 89 })

        owners.push(owner1)
        owners.push(owner2)
        owners.push(owner3)
        owners.push(owner4)
        owners.push(owner5)
        owners.push(owner6)
        owners.push(owner7)
        owners.push(owner8)
        owners.push(owner9)
        owners.push(owner10)

        owners.forEach((owner) => {
            db.addOwner(owner.dataValues)
        })
    },

    getOwner: async function () {
        return await db.getOwners()
    },

    getOneOwner: async function (id) {
        return await db.getOneOwnerById(id)
    },

    createOwner: async function (id, firstName, lastName, address, phone, email, age) {
        let newOwner = new Owner({ id: id, firstName: firstName, lastName: lastName, address: address, phone: phone, email: email, age: age })
        return await db.addOwner(newOwner.dataValues)
    },

    deleteOwner: async function (id) {
        return await db.deleteOwner(id)
    },

    updateOwner: async function (id, firstName, lastName, address, phone, email, age) {
        let index = owners.filter(el => el.id == id)

        owners[index] = {
            id: parseInt(id),
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            email: email,
            age: age
        }

        return await db.updateOwner(owners[index])
    },

    getStatisticReport: async function () {
        return await db.getStatisticReport()
    },

    changeOwnerIdOfCats: async function (owner, cats_list) {
        return await db.changeOwnerIdOfCats(owner, cats_list)
    },

    createCatForOwner: async function (owner, cats_list) {
        return await db.createCatForOwner(owner, cats_list)
    }
}