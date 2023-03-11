const Owner = require("../models/owners_model.js")
const db = require("../database/owners_database.js")

var owners = []

module.exports = {
    genOwner: function () {
        owners = []

        let owner1 = new Owner(1, "Oliver", "Smith", "34 Cook Street", 71838750, "olism@gmail.com")
        let owner2 = new Owner(2, "John", "Karev", "12 Main Street", 71838751, "johnykav@yahoo.com")
        let owner3 = new Owner(3, "Mary", "Grey", "23 Park Avenue", 71838752, "marygrey@gmail.com")

        owners.push(owner1)
        owners.push(owner2)
        owners.push(owner3)

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
        let newOwner = new Owner(id, firstName, lastName, address, phone, email)

        return await db.addOwner(newOwner)
    },

    deleteOwner: async function (id) {
        return await db.deleteOwner(id)
    },

    updateOwner: async function (id, firstName, lastName, address, phone, email) {
        let index = owners.findIndex(el => el.id == id)

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