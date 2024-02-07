import Card from '@/components/Card'
import DropDawn from '@/components/DropDawn'
import Header from '@/components/Header'
import IdInput from '@/components/NumberInput'
import Layout from '@/components/Layout'
import NameEnput from '@/components/NameEnput'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NumberInput from '@/components/NumberInput'

export default function Account() {
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
const[level,setLevel]=useState({});
const session=useSession();
const router=useRouter();
    const supabase=useSupabaseClient();
    const[institute,setInstitute]=useState({});
    useEffect(()=>{

       const fetchInstitute=()=>{
        supabase.from('institute').select('*').eq('userId',session.user.id).single().then(
            result=>{
              
              if (!result.error) {
               setInstitute(result.data);
               setLevel(levels.find(level => level.id === result.data.level));
               
              }
            }
          )
       }
     if(session){
        fetchInstitute();
     }else{
        router.push('/login')
     }
       
    },[]);
  return (
   <Layout>
   <Header/>
    <Card>
        <div className='flex flex-col gap-2 p-2'>
        <NumberInput number={institute.userId} title={"ID"} disabled={true}/>
         <NameEnput name={institute.name} disabled={true} title={"nom"}/>
        
       
         <DropDawn list={levels} value={level} disabled={true} title={"niveau"}/>
       
        <div className='flex flex-col '>
        <label className='text-lg  capitalize'>adresse</label>
        <textarea type='text' disabled={true} value={institute.adress} className='bg-gray-100 p-2 rounded-md text-gray-500 outline-none resize-none h-24 border'/>
        </div>

         </div>
    </Card>
   </Layout>
  )
}
