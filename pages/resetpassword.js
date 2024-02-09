import Card from '@/components/Card'
import Password from '@/components/Password'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function Resetpassword() {
    const supabase=useSupabaseClient();
    const router=useRouter();
    const[password,setPassword]=useState('');
    const[passwordConfirm,setPasswordConfirm]=useState('');
    const resetpassword=async()=>{
      if(password===passwordConfirm){
        const { data, error } = await supabase.auth.updateUser({
            password: password
          })
          if(error){
            alert(error)
          }else{
            router.push('/login')
          }
      }else{
        alert("")
      }
      
    }
  return (
    <div className='absolute top-0 left-0  w-full h-full'>
    <div className='max-w-sm mx-auto mt-40 '>
    <Card>
     <div className='flex flex-col gap-3 p-4'>
     <h2 className='text-center text-2xl font-semibold'>Réinitialiser le mot de passe</h2>
     
      <Password changeValue={setPassword} placeholder={"Mot de passe"} />
         <Password changeValue={setPasswordConfirm}  placeholder={"Confirmez le mot de passe"}/>
     
      <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={resetpassword} >Sauvegarder</button>
     
   
     </div>
 </Card>
    </div>
 </div>
  )
}
