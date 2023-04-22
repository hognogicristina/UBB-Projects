const contOwner = require("../controllers/owners_controller.js")

const reportAvgTest = function () {
    test("Report all owners ordered by their cats' average", async () => {
        const result = await contOwner.getStatistics()
        expect(result.length).toEqual(10)
    })

    test("Report first three owner's first name from the list", async () => {
        const result = await contOwner.getStatistics()
        expect(result[0].dataValues.firstName).toEqual("Jackson")
        expect(result[1].dataValues.firstName).toEqual("Jose")
        expect(result[2].dataValues.firstName).toEqual("Mary")
    })

    test("Report last two owner's first name from the list", async () => {
        const result = await contOwner.getStatistics()
        expect(result[result.length - 2].dataValues.firstName).toEqual("Alex")
        expect(result[result.length - 1].dataValues.firstName).toEqual("John")
    })

    test("Report the second average age of cats", async () => {
        const result = await contOwner.getStatistics()
        expect(result[1].dataValues.avgAge).toEqual("2.0000")
    })

    test("Report last average age of cats", async () => {
        const result = await contOwner.getStatistics()
        expect(result[result.length - 1].dataValues.avgAge).toEqual("5.0000")
    })
}

reportAvgTest()