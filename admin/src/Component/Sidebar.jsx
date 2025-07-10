import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className="w-[18%] min-h-screen border-r-2 bg-white">
            <div className="flex flex-col gap-2 pt-8 px-4 text-[15px]">

                {/* Add Items */}
                <NavLink
                    to="/add"
                    className="flex items-center gap-3 border px-3 py-2 rounded"
                >
                    <img src={assets.add_icon} alt="Add Icon" className="w-5 h-5" />
                    <p className="hidden md:block ">Add Items</p>
                </NavLink>


                {/* List Items */}
                <NavLink
                    to="/list"
                    className="flex items-center gap-2 border px-4 py-2 rounded"
                >
                    <img src={assets.order_icon} alt="List Icon" className="w-5 h-5" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>

                {/* Orders */}
                <NavLink
                    to="/orders"
                    className="flex items-center gap-2 border px-4 py-2 rounded"
                >
                    <img src={assets.order_icon} alt="Order Icon" className="w-5 h-5" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar
