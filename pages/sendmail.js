import Card from '@/components/Card'
import Email from '@/components/Email'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';

import React, { useState } from 'react'

export default function Sendmail() {
  const supabase=useSupabaseClient();
  const[email,setEmail]=useState('');
  const sendMail=async()=>{
    
const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'http://localhost:3000/resetpassword',
})
if(error){
  alert(error)
}else{
  alert("Vérifiez votre courrier pour le lien de réinitialisation du mot de passe")
}
  }
  return (
    <div className='absolute top-0 left-0  w-full h-full bg-secondary'>
    <div className='max-w-sm mx-auto mt-52 '>
    <Card>
     <div className='flex flex-col gap-3 p-4'>
     <h2 className='text-center text-3xl font-semibold'>Détails de l'email </h2>
     <p className='text-gray-400 text-center'>Entrez votre email pour envoyer le lien de réinitialisation du mot de passe</p>
      <Email changeEmail={setEmail}/>
     
      <button className='bg-primary text-white shadow-md py-2 px-6 text-md rounded-md' onClick={sendMail}>Envoyer</button>
      <Link href="/login" className='text-primary font-medium text-center'>Revenir à la connexion ?</Link>
      
     </div>
 </Card>
    </div>
 </div>
  )
}
