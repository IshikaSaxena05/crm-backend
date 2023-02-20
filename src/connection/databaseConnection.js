const mongoose = require("mongoose")
const DB_option = {
    dbName: "crm",
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set("strictQuery", false);

const connectDB = async (DB_Url) => {
    console.log(DB_Url);
mongoose.connect(DB_Url, DB_option)
.then( () => console.log("connection successful...."))
.catch( (err) => console.log(err) );
}

module.exports = connectDB;