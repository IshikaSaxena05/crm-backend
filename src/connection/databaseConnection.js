const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://cluster0.fdr4btl.mongodb.net/crm",{
    serverSelectionTimeoutMS: 10000
}).then(()=>   
 console.log("Success!!"))
.catch((err)=>
    console.log(err)
)