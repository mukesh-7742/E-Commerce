import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductsItem from './ProductsItem';

const BestSeller = () => {
    const { products}= useContext(ShopContext);
    const[bestSeller,setBestSeller]=useState([]);

    useEffect(()=>{
       const bestProduct=products.filter((item)=>(item.bestseller));
       setBestSeller(bestProduct.slice(0,5))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLER'}/>
             <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'> Lorem ipsum is simpl dummy text of the printing and typesetting industry.Lorem ipsum has been the 
             </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
          {
            bestSeller.map((item,index)=>(
                <ProductsItem key ={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>


    </div>
  )
}

export default BestSeller