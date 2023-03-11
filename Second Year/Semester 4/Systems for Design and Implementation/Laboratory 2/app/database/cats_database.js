const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    database: "meow",
    user: "root",
    password: "",
    port: 3307
});

async function getCats() {
    var query = "SELECT * FROM cats"
    return new Promise((resolve, _) => {
        con.connect(() => {
            con.query(query, function (err, result) {
                if (err) throw err;
                resolve(result)
            });
        })
    })
}

async function getOneCatById(id) {
    var query = "SELECT * FROM cats WHERE id = ?"

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
    var query = "SELECT COUNT(*) as cnt FROM cats"

    return new Promise((resolve, _) => {
        con.connect(() => {
            con.query(query, function (err, result) {
                if (err) throw err;
                resolve(result[0].cnt)
            });
        })
    })
}

async function addCat(cat) {
    var query = "INSERT INTO cats (id, name, age, color, breed, weight, ownerId) VALUES (?, ?, ?, ?, ?, ?, ?)"

    return new Promise((resolve, _) => {
        con.connect(() => {
            con.query(query, [cat.id, cat.name, cat.age, cat.color, cat.breed, cat.weight, cat.ownerId], function (err, result) {
                if (err) throw err;
                resolve(result)
            });
        })
    })
}

async function deleteCat(id) {
    var query = "DELETE FROM cats WHERE id = ?"

    return new Promise((resolve, _) => {
        con.connect(() => {
            con.query(query, [id], function (err, result) {
                if (err) throw err;
                resolve(result)
            });
        })
    })
}

async function updateCat(cat) {
    var query = "UPDATE cats SET name = ?, age = ?, color = ?, breed = ?, weight = ?, ownerId = ? WHERE id = ?"

    return new Promise((resolve, _) => {
        con.connect(() => {
            con.query(query, [cat.name, cat.age, cat.color, cat.breed, cat.weight, cat.ownerId, cat.id], function (err, result) {
                    if (err) throw err;
                    resolve(result)
                }
            );
        })
    })
}

async function filterCatsByWeight(weight) {
    return new Promise((resolve, _) => {
        con.connect(() => {
            con.query("SELECT * FROM cats WHERE weight > ?", [weight], function (err, result) {
                if (err) throw err;
                resolve(result)
            });
        })
    })
}

module.exports = {
    getCats: getCats,
    getOneCatById: getOneCatById,
    countRows: countRows,
    addCat: addCat,
    deleteCat: deleteCat,
    updateCat: updateCat,
    filterCatsByWeight: filterCatsByWeight
}