import Card from '@/components/Card'
import DropDawn from '@/components/DropDawn'
import NameEnput from '@/components/NameEnput'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import Login from './login';

export default function Information() {
    const levels=[
        {
            id:1,
            name:'Primer'
        },
        {
            id:2,
            name:'College'
        },
        {
            id:3,
            name:'Lycee'
        },
    ];
    const[name,setName]=useState('');
    const[level,setLevel]=useState(levels[2]);
    const adress=useRef('');
    const supabase=useSupabaseClient();
    const session=useSession()
    const router=useRouter()
    const inserInformation=()=>{

     if (adress!=='' && name!=='') {
        supabase.from('institute').insert({userId:session.user.id,name:name,level:level.id,adress:adress.current.value}).then(
            result=>{
                if (result.error) {
                    console.log(result.error)
                }else{
                    router.push('/');
                }
            }
         )
     }
    }
    if (!session) {
        return <Login/>
        
      }
  return (
    <div className='absolute top-0 left-0  w-full h-full bg-secondary'>
    <div className='max-w-xl mx-auto mt-32 '>
    <Card>
    <div className='flex flex-col gap-2 p-2'>
     
     <NameEnput name={name} changeName={setName} title={"Nom de l'Institut"}  />
   
   
     <DropDawn list={levels} value={level} changeValue={setLevel} title={'niveau'}/>
  
    <div className='flex flex-col '>
    <label className='text-lg  capitalize'>adresse</label>
    <textarea type='text' placeholder='Adress....' ref={adress} className='bg-gray-100 p-2 rounded-md text-gray-500 outline-none resize-none h-24 border'/>
    </div>
     <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={inserInformation}>Save</button>
     </div>
</Card>
</div>
</div>
  )
}
