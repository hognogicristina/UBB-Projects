module.exports = class Foods { // many to many relationship: 
                               // many foods can eaten ny many cats and many cats can eat many foods of the same type
    constructor(id, name, brand, price, quantity, type) {
        this.id = id
        this.name = name
        this.brand = brand
        this.price = price
        this.quantity = quantity
        this.type = type
    }
}