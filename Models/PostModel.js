import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useRef, useState } from 'react'

export default function PostModel({showModel,refrech}) {
    const supabase=useSupabaseClient();
    const session=useSession();
    
    const [text,setText]=useState('');
   
    const addPost=()=>{
        if(text!==''){
         supabase.from('posts').insert({context:text,date:new Date(),userId:session.user.id}).then(
             result=>{
                 if (!result.error) {
                     refrech();
                     showModel(false);
                 }
             }
            );
        }
     }
     const handlTextChange=(e)=>{
      const value=e.target.value;
    setText(value)
     }
  return (
    <div className='w-full p-3 bg-white rounded-md flex flex-col gap-3'>
    <div className='flex flex-row-reverse'>
    <button onClick={()=>showModel(false)} className=''>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

    </button>
    </div>
   <div className='flex flex-col'>
   <label className='capitalize font-medium text-lg'>publier</label>
    <textarea className='outline-none w-96 h-60 resize-none border p-3 rounded-md text-lg' onChange={handlTextChange}>

    </textarea>
   </div>
   <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={addPost}>Sauvegarder</button>
</div>
  )
}
