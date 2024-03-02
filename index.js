
const express = require('express');
const productModel = require('./Model/product')   // model import
require('./config/dbConnection') ;  // for db connection
const multer = require('multer');
const os = require('os')
const app = express()


app.use(express.json())   // for converting json object = json.stringfy()


// for post  api 
app.post('/create', async (req, res) => {

    const data = new productModel(req.body)
    const result = await data.save()

    res.send(result)
})

// for get api

app.get("/list", async (req, res) => {
    const data = await productModel.find();
    res.send(data)
})



//delete api
app.delete('/delete/:_id', async (req, res) => {
    console.log(req.params)
    const data = await productModel.findOneAndDelete(req.params)

    res.send(data)
})

// multiple delete
app.delete('/deleteMany', async (req, res) => {
    const { ids } = req.body
    const data = await productModel.deleteMany({ _id: { $in: ids } })
    res.send(req.body)
})


//put api
app.put('/update/:_id', async (req, res) => {
    const data = await productModel.updateOne(req.params, { $set: req.body })
    res.send(data)

})


//search api 
app.get('/search/:key', async (req, res) => {
    console.log(req.params.key)
    const data = await productModel.find({
        "$or": [
            { name: { $regex: req.params.key, $options: 'i' } },
            { age: parseInt(req.params.key) },
            { brand: { $regex: req.params.key, $options: 'i' } },
            { model: { $regex: req.params.key, $options: 'i' } }
        ]
    })
    res.send(data)
})


 // file uploade 

 // middleware to uploade function

 const upload = multer({
  storage :multer.diskStorage({
    destination :function(req, file , cb){
        cb(null , 'uploadFile')
    },
    filename:function(req, filename, cb){
        cb(null, filename.fieldname + '-' + Date.now() + '.jpg')
    }
  })
 }).array("image", 10)

 app.post('/upload', upload,async (req, res) =>{
  console.log(req.files)
      res.send(req.files)
 })
  
 
 //os module  = this is related with operating ralated module
console.log(os.arch(), "Architecture")
console.log(os.freemem()/(1024*1024*1024) , "free memory  ram")
console.log(os.totalmem()/(1024*1024*1024), "total memery ram")
console.log(os.hostname() , "hostname");
console.log(os.platform() , "platform");
console.log(os.userInfo())
app.listen(2345)

