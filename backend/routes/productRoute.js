import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middelware/multer.js';
import AdminAuth from '../middelware/AdminAuth.js';

const productRouter = express.Router();

// Add a new product
productRouter.post(
  '/add',AdminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

// Remove a product
productRouter.post('/remove', AdminAuth,removeProduct);

// Get a single product
productRouter.post('/single', singleProduct);

// Get all products
productRouter.get('/list', listProduct);

export default productRouter;
