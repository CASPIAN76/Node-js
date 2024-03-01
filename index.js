
const express = require('express');
const productModel = require('./Model/product')   // model import
require('./config/dbConnection')   // for db connection
const app = express()

app.use(express.json())   // for converting json object = json.stringfy()


// for post  api 
app.post('/create', async (req, res) => {

    const data = new productModel(req.body)
    const result = await data.save()

    res.send(result)
})

// for get api

app.get("/list", async(req, res)=>{
 const data =  await productModel.find();
    res.send(data)
})


app.delete('/delete/:_id', async(req, res)=>{
       console.log(req.params)
    const data = await productModel.findOneAndDelete(req.params)

     res.send(  data)
})

 app.delete('/deleteMany', async (req,res)=>{
     const {ids} =req.body
     const data = await productModel.deleteMany({_id:{$in:ids }})
     res.send( req.body)
 } )

app.put('/update/:_id', async (req,res)=>{
   const data = await productModel.updateOne(req.params, {$set :req.body})
      res.send(data)

})



app.listen(2345)

