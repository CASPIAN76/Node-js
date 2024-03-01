
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-comm')


const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  quality: String,
  category: String,
  status:Boolean
})

const create = async () => {

  const productModel = mongoose.model("product", productSchema)

  const data = new productModel(
    //{ name: "kartik", price: 400, quantity: 900, quality: "good", category: "wire" },
   // { name: "Nilesh", price: 600, quantity: 1900, quality: "avrage", category: "chemical" },
    //{ name: "shirt", price: 200, quantity: 600, quality: "A++", category: "cloth" },
    { name: "saree", price: 100, quantity: 700, quality: "A", category: "cloth" }
  
  )
  console.log(data,)
  const result = await data.save()


}

//create()

const updateDB = async () => {
  const productModel = mongoose.model('product', productSchema);
  const data = await productModel.updateMany({ category: "wire" }, { $set: { name: "kartik", price: 3000, quantity: 90, quality: "best", category: "wire" } })
  console.log(data, "record updates")
}
//updateDB()

const deleteDB = async () => {
  const productModel = mongoose.model("products", productSchema)
  const data = await productModel.deleteMany({  })
  console.log(data, "deleted")
}

//deleteDB()

const findData=async ()=>{
  const productModel =mongoose.model("products", productSchema);
 // const data = await productModel.findOne({name:"Nilesh"})
 const data = await productModel.findById("65e1eae284c617611b14b013")
  console.log(data)
}


findData()
