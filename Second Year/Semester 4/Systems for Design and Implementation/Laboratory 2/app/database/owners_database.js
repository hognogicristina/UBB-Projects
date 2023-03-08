const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    database: "meow",
    user: "root",
    password: "",
    port: 3307
});

async function getOwners() {
    var query = "SELECT * FROM owners"
    return new Promise((resolve, _) => {
        con.connect(() => {
            con.query(query, function (err, result) {
                if (err) throw err;
                resolve(result)
            });
        })
    })
}

async function getOneOwnerById(id) {
    var query = "SELECT * FROM owners WHERE id = ?"
    return new Promise((resolve, _) => {
        con.connect(() => {
            con.query(query, [id], function (err, result) {
                if (err) throw err;
                resolve(result[0])
            });
        })
    })
}

async function countRows() {
    var query = "SELECT COUNT(*) as cnt FROM owners"
    return new Promise((resolve, _) => {
        con.connect(() => {
            con.query(query, function (err, result) {
                if (err) throw err;
                resolve(result[0].cnt)
            });
        })
    })
}

function addOwner(owner) {
    con.connect(() => {
        con.query("INSERT INTO owners (id, firstName, lastName, address, phone, email) VALUES (?, ?, ?, ?, ?, ?)",
            [owner.id, owner.firstName, owner.lastName, owner.address, owner.phone, owner.email], function (err) {
                if (err) throw err;
            });
    })
}

function deleteOwner(id) {   
    con.connect(() => {
        con.query("DELETE FROM owners WHERE id = ?", [id], function (err) {
            if (err) throw err;
        });
    })
}

function updateOwner(owner) {
    con.connect(() => {
        con.query("UPDATE owners SET firstName = ?, lastName = ?, address = ?, phone = ?, email = ? WHERE id = ?",
            [owner.firstName, owner.lastName, owner.address, owner.phone, owner.email, owner.id], function (err) {
                if (err) throw err;
            });
    })
}

module.exports = {
    getOwners: getOwners,
    getOneOwnerById: getOneOwnerById,
    countRows: countRows,
    addOwner: addOwner,
    deleteOwner: deleteOwner,
    updateOwner: updateOwner
}