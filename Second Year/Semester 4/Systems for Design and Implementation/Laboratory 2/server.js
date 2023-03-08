const express = require("express")
const app = express()
app.use(express.json())

require("./app/routes/cats_routes.js")(app)
require("./app/routes/owners_routes.js")(app)

app.listen(8000, () => {
	console.log("Server is up and is running on port 8000...")
})