import Card from '@/components/Card'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Email from '@/components/Email';
import Password from '@/components/Password';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {

    const supabase=useSupabaseClient();
    const session=useSession();
    const router=useRouter();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[emptyEmail,setEmptyEmail]=useState(false);
    const[emptyPassword,setEmptyPasword]=useState(false);
    const[wrongUser,setwrongUser]=useState(false);

    const loginWithGoogle=()=>{
        supabase.auth.signInWithOAuth({
            provider: 'google',
          })
          
    }
    async function signInWithEmail() {
       if(email!=='' && password!==''){
        
        await supabase.auth.signInWithPassword({
            email: email,
            password: password
          }).then(
            result=>{
              if(result.error){
                result.error.message==='Invalid login credentials'? setwrongUser(true):setwrongUser(false)
                
              }else{
                if(session){
                  router.push('/')
                }
              }
            }
          )
       }
       if(email.length===0){
        setEmptyEmail(true);
        
       }else{
         setEmptyPasword(false);
       }
       
       if(password.length===0){
         setEmptyPasword(true);
         
        }else{
         setEmptyPasword(false);
        }
      }
      
  return (
    <div className='absolute top-0 left-0  w-full h-full'>
       <div className='max-w-sm mx-auto mt-40 '>
       <Card>
        <div className='flex flex-col gap-3 p-4'>
        <h2 className='text-center text-2xl font-semibold'>Se connecter</h2>
         <Email changeEmail={setEmail} isEmpty={emptyEmail}/>
         <Password changeValue={setPassword} placeholder={"Mot de passe"} isEmpty={emptyPassword} />
         <Link href="/sendmail" className='text-primary font-medium'>Mot de passe oublié ?</Link>
         <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={signInWithEmail} >Se connecter</button>
         {wrongUser && <div className='text-center text-red-500'>Mauvais email ou mot de passe !</div>}
         <div  className='text-center text-md'>
         vous n avez pas de compte ? <Link href="/register" className='text-primary font-semibold'>Inscrire</Link>
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
