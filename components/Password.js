import React from 'react'
import { FaLock } from "react-icons/fa";
import { IoMdEye,IoMdEyeOff } from "react-icons/io";
export default function Password() {
  return (
    <div className='bg-gray-100 rounded-md flex gap-2 items-center p-2 text-md'>
    <FaLock className='text-gray-400'/>
        <input type='password' className='grow bg-transparent outline-none ' placeholder='Password'/>
     <IoMdEye className='text-gray-400 text-xl cursor-pointer'/>
    </div>
  )
}
