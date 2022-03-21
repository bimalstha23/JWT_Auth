require("dotenv").config;
const mongoose = require("mongoose");
// mongokey = process.env.mongokey;
const mongokey = 'mongodb+srv://Bimal:bimal@cluster0.ael8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
module.exports = mongoose.connect(mongokey ,{
    useNewUrlParser: true,
}).then(()=>{
    console.log("mongoDB connected to the app");
}).catch((err)=>{
    console.log(`error:${err}`);
})