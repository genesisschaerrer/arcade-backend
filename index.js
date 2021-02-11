const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors") 
// const bcrypt = require("bcrypt")
require("dotenv").config()
  

const port = process.env.PORT || 4000
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on("error: ",  (error) => console.error(error))   
db.once("open", () => console.log("CONNECTED TO DATABASE")) 

app.use(express.json()) 
app.use(cors())

const gameRoutes = require("./routes/game-routes")
const adminRoutes = require("./routes/admin-routes")

app.use("/", gameRoutes)
app.use("/", adminRoutes)


app.listen(port, () => console.log("LISTENING ON PORT: ", port))