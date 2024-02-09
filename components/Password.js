import React, { useRef, useState } from 'react'
import { FaLock } from "react-icons/fa";
import { IoMdEye,IoMdEyeOff } from "react-icons/io";
export default function Password({changeValue,placeholder}) {
  const[showPassword,setShowPassword]=useState(false);
  const password=useRef(null);
  const handPasword=(e)=>{
   const value=e.target.value;
      changeValue(value);
  }
  const togglePassword=()=>{
    setShowPassword(!showPassword);
    showPassword ?password.current.type='password':password.current.type='text';
  }
  return (
    <div className='bg-gray-100 rounded-md flex gap-2 items-center p-2 text-md'>
    <FaLock className='text-gray-400'/>
        <input type='password' className='grow bg-transparent outline-none ' ref={password} placeholder={placeholder} onChange={handPasword}/>
     {
      showPassword ?<IoMdEyeOff className='text-gray-400 text-xl cursor-pointer' onClick={togglePassword}/>:<IoMdEye className='text-gray-400 text-xl cursor-pointer' onClick={togglePassword}/>
     }
    </div>
  )
}
