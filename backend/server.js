import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import UserRouter from './routes/UserRouter.js'
import productRouter from './routes/productRoute.js'
// import { listProduct } from './controllers/productController.js'

// App Config

const app= express()

const port = process.env.PORT 
connectDB()
connectCloudinary()


// middlewares 

app.use(express.json())
app.use(cors())


// api end points

app .use('/api/user',UserRouter)
app .use('/api/product',productRouter)
app.get('/api/product/list', (req, res) => {
  res.json({ message: 'Product list' });
});


app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>console.log('Server started on PORT:'+ port))