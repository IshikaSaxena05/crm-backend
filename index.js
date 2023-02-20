const express = require("express")
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
const userRoutes = require("./src/controller/userRoutes")
require("./src/connection/databaseConnection")
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT||5000
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/user',userRoutes)
app.listen(PORT,()=>{
    console.log(`Running at ${PORT}`);
})