// Here we define the model for the cats table 

module.exports = class Cats {
    constructor(id, name, age, color, breeds, weight) {
        this.id = id
        this.name = name
        this.age = age
        this.color = color
        this.breeds = breeds
        this.weight = weight
    }
}