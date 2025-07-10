import React from 'react'

const NewsLatterBox = () => {
  const onSubmitHamdler=(event)=>{
    event.preventDefault();
  }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
        lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <form className='w-full sm:-1/2 flex item-center gap-3 mx-auto my-6 border pl-3'>
           <input className='w-full sm:flex-1 outline-none  ' type="email" placeholder='Enter Your email is required' />
           <button type='sumbit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRITION</button>
        </form>
        
    </div>
  )
}

export default NewsLatterBox