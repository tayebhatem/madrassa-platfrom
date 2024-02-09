import Card from '@/components/Card'
import Email from '@/components/Email'
import Password from '@/components/Password'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export default function Register() {
    const supabase=useSupabaseClient();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[passwordConfirm,setPasswordConfirm]=useState('');
    const loginWithGoogle=()=>{
        supabase.auth.signInWithOAuth({
            provider: 'google',
          })
          
    }

    async function signInWithEmail() {
      if(password===passwordConfirm){
        if(email!=='' && password!==''){
            await supabase.auth.signUp({
                email: email,
                password: password
              }).then(
                result=>{
                  if(result.error){
                    alert("error : "+result.error.message)
                  }else{
                    alert('vérifiez votre boîte aux lettres pour confirmer emil '+email)
                  }
                  
                }
              )
           }
      }else{
        alert('les mots de passe ne sont pas les mêmes !')
      }
      }

  return (
    <div className='absolute top-0 left-0  w-full h-full bg-secondary'>
       <div className='max-w-sm mx-auto mt-52 '>
       <Card>
        <div className='flex flex-col gap-3 p-4'>
        <h2 className='text-center text-2xl font-semibold'>Inscrire</h2>
         <Email changeEmail={setEmail}/>
         <Password changeValue={setPassword} placeholder={"Mot de passe"}/>
         <Password changeValue={setPasswordConfirm}  placeholder={"Confirmez le mot de passe"}/>
       
         <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={signInWithEmail} >Inscrire</button>
         <div  className='text-center text-md'>
         vous avez déjà un compte ?<Link href="/login" className='text-primary font-semibold'>connecter</Link>
         </div>
       <div className='flex flex-col gap-2'>
       <button className='flex gap-2 items-center border rounded-md p-2 text-lg justify-center' onClick={loginWithGoogle}>
        <FcGoogle className='text-3xl'/>
        Connectez vous avec Google
        </button>

        <button className='flex gap-2 items-center border rounded-md p-2 text-lg justify-center'>
        <FaFacebook className='text-3xl text-[#316FF6]'/>
        Connectez vous avec Facebook
        </button>
       </div>
        </div>
    </Card>
       </div>
    </div>
  )
}
