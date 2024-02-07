import { useState } from "react";

export default function NumberInput({number,changeNumber,disabled,title,placeholder}) {
   
  

  const handleInputChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    event.target.value = inputValue;
    changeNumber(inputValue);
  };
  return (
    <div className="flex flex-col">
    <label className="text-lg">{title}</label>
    <input type='text' placeholder={placeholder}  value={number} disabled={disabled} className='bg-gray-100 p-2 rounded-md text-gray-500 outline-none border ' onChange={handleInputChange}/>
</div>
  )
}
