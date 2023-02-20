require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require("./src/connection/databaseConnection")
const web = require("./src/routes/index")

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL || "mongodb+srv://cluster0.fdr4btl.mongodb.net/crm"

// database connection
connectDB(DB_URL);

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Load routing
app.use('/',web);

app.listen(PORT,()=>{
    console.log(`Running at ${PORT}`);
})