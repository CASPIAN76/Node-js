
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-comm')


const productSchema= new mongoose.Schema({
  name:String,
  price:Number,
  quantity:Number,
  quality:String
})

const main=async()=>{

  const productModel=  mongoose.model("product", productSchema)

  const data= new productModel({name:"laptop", price:200, quantity:500, quality:"good"})
  const result =await data.save()


}

main()