import React, { useEffect, useRef } from 'react'
import { FaUser } from "react-icons/fa";

export default function Email({changeEmail,isEmpty}) {
  const emailText=useRef('');
    const handleChange = () => {
     
       changeEmail(emailText.current.value);
      };
      useEffect(()=>{
        changeEmail(emailText.current.value);
      },[]);
  return (
    <div>
      <div className={isEmpty?'bg-gray-100 rounded-md flex gap-2 items-center border p-2 border-red-500 ':'bg-gray-100 rounded-md flex gap-2 items-center p-2 border invalid:border-red-500 '}>
    <FaUser className='text-gray-400'/>
        <input type='email' className='grow bg-transparent outline-none ' placeholder='Email' onInput={handleChange} ref={emailText}/>
       
    </div>
    {isEmpty && <div className='text-red-500'>Email est vide ! </div>}
    </div>
  )
}
