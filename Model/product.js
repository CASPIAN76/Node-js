const mongoose = require('mongoose')


const productSchema= new mongoose.Schema({
 name:String,
 age:Number,
 brand:String,
 status:Boolean,
 model:String

})


module.exports = mongoose.model("product", productSchema)