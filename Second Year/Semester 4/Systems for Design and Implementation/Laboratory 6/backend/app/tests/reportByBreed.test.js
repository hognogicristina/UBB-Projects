const contCat = require("../controllers/cats_controller.js")

const reportBreedTest = function () {
    test("Report cats by breed: Persian having 2 cats with same owner", async () => {
        const result = await contCat.getStatisticsBreed("Persian", undefined)
        expect(result.length).toEqual(2)
    })

    test("Report cats by breed: Bombay", async () => {
        const result = await contCat.getStatisticsBreed("Bombay", undefined)
        expect(result.length).toEqual(3)
    })

    test("Report cats by invalid breed", async () => {
        const result = await contCat.getStatisticsBreed("Invalid", undefined)
        expect(result.length).toEqual(0)
    })

    test("Report first owner's name by breed: Tabby", async () => {
        const result = await contCat.getStatisticsBreed("Tabby", undefined)
        expect(result[0].owner.dataValues.firstName).toEqual("April")
    })

    test("Report last owner's first name by breed: Siamese", async () => {
        const result = await contCat.getStatisticsBreed("Siamese", undefined)
        expect(result[result.length - 1].owner.dataValues.firstName).toEqual("John")
    })
}

reportBreedTest()