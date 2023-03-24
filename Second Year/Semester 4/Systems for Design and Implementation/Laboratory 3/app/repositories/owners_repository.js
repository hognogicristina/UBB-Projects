const Owner = require("../models/owners_model.js")
const db = require("../database/owners_database.js")

var owners = []

module.exports = {
    genOwner: function () {
        owners = []

        let owner1 = new Owner(1, "Oliver", "Smith", "34 Cook Street", 71838750, "olism@gmail.com")
        let owner2 = new Owner(2, "John", "Karev", "12 Main Street", 71838751, "johnykav@yahoo.com")
        let owner3 = new Owner(3, "Mary", "Grey", "23 Park Avenue", 71838752, "marygrey@gmail.com")
        let owner4 = new Owner(4, "Meredith", "Grey", "34 Cook Street", 71838753, "mergrey@gmail.com")
        let owner5 = new Owner(5, "Alex", "Karev", "12 Main Street", 71838754, "karev@yahoo.com")
        let owner6 = new Owner(6, "Jo", "Wilson", "23 Park Avenue", 71838755, "jo@yahoo.com")
        let owner7 = new Owner(7, "Richard", "Webber", "34 Cook Street", 71838756, "rich@yahoo.com")
        let owner8 = new Owner(8, "Jackson", "Avery", "12 Main Street", 71838757, "jack@gmail.com")
        let owner9 = new Owner(9, "April", "Kepner", "23 Park Avenue", 71838758, "april@yahoo.com")
        let owner10 = new Owner(10, "Callie", "Torres", "34 Cook Street", 71838759, "callie@gmail.com")

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
            db.addOwner(owner)
        })
    },

    getOwner: async function () {
        return await db.getOwners()
    },

    getOneOwner: async function (id) {
        return await db.getOneOwnerById(id)
    },

    createOwner: async function (id, firstName, lastName, address, phone, email) {
        let newOwner = new Owner({ id: id, firstName: firstName, lastName: lastName, address: address, phone: phone, email: email })
        return await db.addOwner(newOwner.dataValues)
    },

    deleteOwner: async function (id) {
        return await db.deleteOwner(id)
    },

    updateOwner: async function (id, firstName, lastName, address, phone, email) {
        let index = owners.filter(el => el.id == id)

        owners[index] = {
            id: parseInt(id),
			firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            email: email
		}

        return await db.updateOwner(owners[index])
    }
}