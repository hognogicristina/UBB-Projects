const contCat = require("../controllers/cats_controller.js")

const filterTests = function () {
    test("Filtering cats with weight > 8", async () => {
        var result = await contCat.filterCat(8, undefined)
        expect(result.length).toEqual(5)
    })
    
    test("Filtering cats with weight > 3", async () => {
        var result = await contCat.filterCat(3, undefined)
        expect(result.length).toEqual(13)
    })

    test("Filtering cats with weight > 0", async () => {
        var result = await contCat.filterCat(0, undefined)
        expect(result.length).toEqual(15)
    })

    test("Filtering cats with weight > 1000000", async () => {
        var result = await contCat.filterCat(1000000, undefined)
        expect(result.length).toEqual(0)
    })

    test("Filtering cats with weight > 10", async () => {
        var result = await contCat.filterCat(10, undefined)
        expect(result.length).toEqual(0)
    })
}

filterTests()