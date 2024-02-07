import { useState } from "react";

export default function NameEnput({name,changeName,disabled,title,placeholder}) {
   
    const handleInputChange = (event) => {
        const value = event.target.value;
        if (/^[a-zA-Z\s]+$/.test(value) || value === '') {
            changeName(value);
        }
      };
  return (
    <div className="flex flex-col">
         <label className="text-lg capitalize">{title}</label>
         <input type='text' placeholder={placeholder} value={name} disabled={disabled} className='bg-gray-100 p-2 rounded-md text-gray-500 outline-none border ' onChange={handleInputChange}/>
    </div>
  )
}
