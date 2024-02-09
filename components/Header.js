import { toggleNavigation } from '@/features/navigationSlice';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";

export default function Header() {
    const dispatch=useDispatch();
    const [avatar,setAvatar]=useState('');
    const router=useRouter()
    const session=useSession();
    const supabase=useSupabaseClient()
    useEffect(()=>{
       if (session) {
        supabase.from('profiles').select('avatar').eq('id',session.user.id).single().then(
            result=>{
              
              if (!result.error) {
               setAvatar(result.data.avatar);
             
               
              }
            }
          )
       }
    },[]);
  return (
    <header className="flex justify-between items-center  p-3">
    <div className="cursor-pointer" onClick={()=>dispatch(toggleNavigation())}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

    </div>
    <div className="relative flex justify-center items-center rounded-full bg-gray-100 w-16 h-16 overflow-hidden">
   <div className='absolute'>
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0245D1" className="w-16 h-16">
  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
</svg>
   </div>
   <img src={avatar}   className='absolute ' />
    </div>
    
  </header>
  )
}
