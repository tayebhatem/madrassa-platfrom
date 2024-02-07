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
    <img src={avatar}  width={60} height={60} className="rounded-full bg-gray-100"/>
  </header>
  )
}
