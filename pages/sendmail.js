import Card from '@/components/Card'
import Email from '@/components/Email'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Sendmail() {
  const supabase=useSupabaseClient();
  const[email,setEmail]=useState('');
  const[emptyEmail,setEmptyEmail]=useState(false);
  const sendMail=async()=>{
    
if (email!=='') {
  setEmptyEmail(false)
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/resetpassword',
  })
  if(error){
    warn(error.message)
  }else{
    success()
  }
}else{
  setEmptyEmail(true)
}
  }
  const success = () => {
    toast.success('Vérifiez votre courrier '+email, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
     
      });
  };
  const warn = (text) => {
    toast.error(text+"", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
 
      });
  };
  return (
    <>
      <div className='absolute top-0 left-0  w-full h-full bg-secondary'>
    <div className='max-w-sm mx-auto mt-52 '>
    <Card>
     <div className='flex flex-col gap-3 p-4'>
     <h2 className='text-center text-3xl font-semibold'>Détails de l'email </h2>
     <p className='text-gray-400 text-center'>Entrez votre email pour envoyer le lien de réinitialisation du mot de passe</p>
      <Email changeEmail={setEmail} isEmpty={emptyEmail}/>
     
      <button className='bg-primary text-white shadow-md py-2 px-6 text-md rounded-md' onClick={sendMail}>Envoyer</button>
  
      
     </div>
 </Card>
    </div>
 </div>
 <ToastContainer
  position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

 />
    </>
  )
}
