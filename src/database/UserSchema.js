const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const schema = new mongoose.Schema({
        firstname:{
            type:String,
            require:true,
            minlength:3
        },
        lastname:{
            type:String,
            require:true,
            minlength:3
        },
        email:{
            type:String,
            unique:[true,"Email already exist"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email")
                }
            }
        },
        dob:{
            type:Date,
        },
       
        phone:{
            type:Number,
            min:10,
        },
        password:{
            type:String,
        },
        confirm_password:{
            type:String,
        },
        tokens:[
            {
               token:{
                type:String,
                required:true
               }
            }
    
        ]
    },
        { timestaps: true }
    )
      schema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
      schema.methods.generateAuthToken = async function(){
        try{
            let token = jwt.sign({_id:this._id},'hiii');
            this.tokens = this.tokens.concat({token:token});
            await this.save();
            return token;
        }catch(err){
            console.log(err);
        }
    }
      schema.pre("save", async function (next) {
        if (!this.isModified) {
          next();
        }
      
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.confirm_password = await bcrypt.hash(this.confirm_password, salt);

      });
    const Model = new mongoose.model("Model",schema)
module.exports = Model