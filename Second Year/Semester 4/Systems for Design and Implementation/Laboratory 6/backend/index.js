const express = require("express")
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

const swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json')

require("./app/routes/owners_routes.js")(app)
require("./app/routes/cats_routes.js")(app)
require("./app/routes/foods_for_cats_routes.js")(app)
require("./app/routes/foods_routes.js")(app)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument), (req, res) => {
	res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
})

app.get("/api", (_, res) => {
	res.send("Welcome to the Adopt a Cat app!")
})

app.listen(8000, () => {
	console.log("Server is up and is running on port 8000...")
})

module.exports = app