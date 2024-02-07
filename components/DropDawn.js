import { useState } from 'react';
import { ClickOutHandler } from 'react-clickout-ts'

export default function DropDawn({list,value,changeValue,disabled,title}) {
    const [showDopDawn,setShowDropDawn]=useState(false);
    
    const handleClickOut = () => {
        setShowDropDawn(false);
      }
    const toggleDropDawn=()=>{

      !disabled &&  setShowDropDawn(!showDopDawn);
    }
    const changeDelultValue=(item)=>{
        changeValue(item)
    }
  return (
    <div className="flex flex-col">
    <label className="text-lg capitalize">{title}</label>

      <ClickOutHandler onClickOut={handleClickOut}>
 
    
 <div onClick={toggleDropDawn}  className='grow relative flex cursor-pointer border bg-gray-100 p-2 rounded-md text-gray-500'>
 <div className='grow'>{value && value.name}</div>
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
{
 showDopDawn &&  
 <ul className='absolute z-10 bg-white w-full top-11 left-0 shadow-md rounded-md first:text-2xl max-h-36 overflow-auto'>
{
list.map(item=>(
 <>
 <li key={item.id} onClick={()=>changeDelultValue(item)} className='p-2 hover:bg-primary text-black text-md hover:text-white first:rounded-t-md last:rounded-b-md'>{item.name}</li>
 </>
))
}
</ul>
}
 </div>


</ClickOutHandler>
  </div>
  )
}
