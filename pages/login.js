import Card from '@/components/Card'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Email from '@/components/Email';
import Password from '@/components/Password';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
export default function Login() {
    const supabase=useSupabaseClient();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const loginWithGoogle=()=>{
        supabase.auth.signInWithOAuth({
            provider: 'google',
          })
          
    }
    async function signInWithEmail() {
       if(email!=='' && password!==''){
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
          })
       }
      }
      
  return (
    <div className='absolute top-0 left-0  w-full h-full bg-secondary'>
       <div className='max-w-sm mx-auto mt-52 '>
       <Card>
        <div className='flex flex-col gap-3 p-4'>
        <h2 className='text-center text-2xl font-semibold'>Login</h2>
         <Email changeEmail={setEmail}/>
         <Password/>
         <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={signInWithEmail} >Login</button>
       <div className='flex flex-col gap-2'>
       <button className='flex gap-2 items-center border rounded-md p-2 text-lg justify-center' onClick={loginWithGoogle}>
        <FcGoogle className='text-3xl'/>
        Login with Google
        </button>

        <button className='flex gap-2 items-center border rounded-md p-2 text-lg justify-center'>
        <FaFacebook className='text-3xl text-[#316FF6]'/>
        Login with Facebook
        </button>
       </div>
        </div>
    </Card>
       </div>
    </div>
  )
}
