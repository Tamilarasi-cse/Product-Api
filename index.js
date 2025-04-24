
const express =require('express')
const app = express()
const mongoose =require('mongoose');

// Importing of product Module

const Product =require('./product.model');

//Middleware to convert json
app.use(express.json());



app.use(express.static('public'));
app.get('/testApi',(req,res) => {
    res.send("thunderstorm")
    console.log("happpy")
})




// post a product

app.post('/api/products',async(req,res)=>
{
    try{
        const product =await Product.create(req.body)
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


// get all products
app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// get specific product
app.get('/api/products/:id', async (req, res) => {
    try {
        const {id} =req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


// update a product

app.put('/api/products/:id',async(req,res) =>
{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product)
        {
            return res.status(404).json({message:'Product not found'});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
})

// Delete a product

// delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


app.listen(3000)

// mongodb connection
mongoose.connect('mongodb+srv://tamilarasi0422:xjtPTB72STTEzZbA@cluster0.xls3xps.mongodb.net/NODE_API?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log('connected'))
.catch((error)=>console.log('connection error',error))