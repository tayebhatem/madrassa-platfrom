import ScheduleModel from '@/Models/ScheduleModel';
import Card from '@/components/Card'
import Layout from '@/components/Layout'
import { levelsList } from '@/data/heighSchoolLevels';
import { specialitesList } from '@/data/speciality';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Login from './login';
import { checkAccount } from '@/helpers';

export default function Schedule() {
    const supabase=useSupabaseClient();
    const router=useRouter();
    const session=useSession();
    const {id}=router.query;
    const level=levelsList.find(item=>item.language==='french')?.levels;
    const speciality=specialitesList.find(speciality=>speciality.language==='french')?.specialites;
    const [showModel, setShowModel] = useState(false);
    const [schedules,setSchedules]=useState([]);
    const fetchSchedule=()=>{
       if(session){
        supabase.from('schedule').select('*,groupe!inner(*)').eq('teacherId',id).then(
            result=>{
                if(!result.error){
                   setSchedules(result.data)
                }
            }
        )
       }
    }
    const deleteSchedule=(id)=>{
        supabase.from('schedule').delete().eq('scheduleId',id).then(
           result=>{
            if(!result.error){
               fetchSchedule()
            }
           }
        )
    }
    useEffect(()=>{
      fetchSchedule();
    },[])
    if (!session) {
        return <Login/>
        
      }else{
        checkAccount(supabase,router,session.user.id);
        fetchSchedule()
      }
  return (
   <>
     {
        showModel && 
        <>
        <div className='absolute bg-black w-full h-full z-10 opacity-30'></div>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-96 flex'>
        <ScheduleModel showModel={setShowModel} refrech={fetchSchedule} />
        </div>
        </>
       }
    <Layout>
       <div className='flex flex-col gap-4'>
       <Card>
          <div className='flex justify-between p-4'>
          <h2 className='text-2xl font-semibold'>Emploi de temps</h2>
         <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={()=>setShowModel(true)}  >Ajouter</button>
          </div>
        </Card>

        <Card>
        <div className='p-3 overflow-auto max-h-96 '>
        <div className='bg-gray-100 rounded-md p-2 flex gap-1 max-w-sm mb-4'>
            <input type='text' className='grow bg-transparent outline-none' />
            <div className='text-gray-400'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
            </div>

        </div>
           <table className='w-full'>
            <thead className='font-bold bg-gray-100 '>
                <tr className='border-b'>
                
                    <td className='capitalize p-2'>classe</td>
                    <td className='capitalize p-2'>jour</td>
                    <td className='capitalize p-2'>hohaire</td>
                   
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody >
              {
                schedules.map(schedule=>(
                  <>
                  <tr className='border-b even:bg-gray-100 font-medium' key={schedule.scheduleId}>
              
                  <td className='capitalize p-2'>{level.find(level=>level.id===schedule.groupe.level)?.name+" "+speciality.flatMap(item=>item).find(speciality=>speciality.id===schedule.groupe.speciality)?.name+" "+schedule.groupe.groupeNum} </td>
                    <td className='capitalize p-2'>{schedule.day}</td>
                    <td className='capitalize p-2'>{schedule.time}</td>
               
                  
                    <td>
                    <button onClick={()=>{deleteSchedule(schedule.scheduleId)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                    </button>

                  </td>
                  <td>
                    <button >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>

                    </button>

                  </td>
                </tr>
                  </>
                ))
              }
            </tbody>
           </table>
        </div>
        </Card>
        </div>
    </Layout>
   </>
  )
}
