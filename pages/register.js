import Card from '@/components/Card'
import Email from '@/components/Email'
import Password from '@/components/Password'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
    const supabase=useSupabaseClient();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[passwordConfirm,setPasswordConfirm]=useState('');
    const[emptyEmail,setEmptyEmail]=useState(false);
    const[emptyPassword,setEmptyPasword]=useState(false);
    const[emptyPasswordConf,setEmptyPaswordConf]=useState(false);
    const[diffrentPassword,setDeffrentPasword]=useState(false);
    const loginWithGoogle=()=>{
        supabase.auth.signInWithOAuth({
            provider: 'google',
          })
          
    }

    async function signInWithEmail() {
      
        if(email!=='' && password!==''){
          if(password===passwordConfirm){
            await supabase.auth.signUp({
                email: email,
                password: password
              }).then(
                result=>{
                  if(result.error){
                    warn(result.error.message)
                  }else{
                    success()
                  }
                  
                }
              )
            }else{
       
              setDeffrentPasword(true)
            }
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
        if(passwordConfirm.length===0){
          setEmptyPaswordConf(true);
          
         }else{
          setEmptyPaswordConf(false);
         }
      }
      const success = () => {
        toast.success('vérifiez votre boîte aux lettres pour confirmer email '+email, {
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
      <div className='absolute top-0 left-0  w-full h-full'>
       <div className='max-w-sm mx-auto mt-40 '>
       <Card>
        <div className='flex flex-col gap-3 p-4'>
        <h2 className='text-center text-2xl font-semibold'>Inscrire</h2>
         <Email changeEmail={setEmail} isEmpty={emptyEmail}/>
         <Password changeValue={setPassword} placeholder={"Mot de passe"} isEmpty={emptyPassword}/>
         <Password changeValue={setPasswordConfirm}  placeholder={"Confirmez le mot de passe"} isEmpty={emptyPasswordConf}/>
       
         <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={signInWithEmail} >Inscrire</button>
         {diffrentPassword && <div className='text-center text-red-500'>les mots de passe ne sont pas les mêmes !</div>}
         <div  className='text-center text-md'>
         vous avez déjà un compte ?<Link href="/login" className='text-primary font-semibold'>Connecter</Link>
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
