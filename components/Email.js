import React from 'react'
import { FaUser } from "react-icons/fa";

export default function Email({email,changeEmail}) {
    const handleChange = (e) => {
        const value=e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ( emailRegex.test(value)) {
            changeEmail(value);
        }
      };
  return (
    <div className='bg-gray-100 rounded-md flex gap-2 items-center p-2'>
    <FaUser className='text-gray-400'/>
        <input type='email' className='grow bg-transparent outline-none ' placeholder='Email' onChange={handleChange}/>
     
    </div>
  )
}
