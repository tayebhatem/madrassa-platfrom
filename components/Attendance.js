import Card from '@/components/Card'
import DropDawn from '@/components/DropDawn';
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Attendance({students}) {
    const[schedule,setSchedule]=useState(null)
    const hourList=[
        {
            language:'french',
            hours:[
               [
                {id:1, name:'08:30 - 09:30'},
                {id:2, name:'09:30 - 10:30'},
                {id:3, name:'10:30 - 11:30'},
                {id:4, name:'11:30 - 12:30'},
               ],
               [
                {id:5, name:'13:30 - 14:30'},
                {id:6, name:'14:30 - 15:30'},
                {id:7, name:'15:30 - 16:30'},
                {id:8, name:'16:30 - 17:30'},
               ]
                
            ]

        }
    ];
    const session=useSession()
    const supabase=useSupabaseClient();
    const router=useRouter();
    const {id}=router.query;
    const [hours,setHours]=useState([...hourList[0].hours[0],...hourList[0].hours[1]]);
    const [hourDefultValue,setHourDefultValue]=useState(hourList[0].hours[0][0]);
    const[date,setDate]=useState(new Date().toISOString().substr(0, 10));
    const [attendances,setAttendance]=useState([])
 
    const [time,setTime]=useState();
    const [classId,setClassId]=useState()
    const datehandler=(e)=>{
      setDate(e.target.value);
      
    };
    const fetchTime =  (item) => {
      const result =  supabase.from('schedule')
                                  .select('*')
                                  .eq('scheduleId', item.class.scheduleId)
                                  .eq('time', hourDefultValue.name);
  
      if (result.error) {
          console.log(result.error);
        
      } else {
          
      }
  }
    const fetchAttendance=()=>{
        supabase.from('attendance').select('*,student!inner(*),class!inner(*)').eq('student.groupeId',id).eq('class.created_at',date).then(
      result=>{
        if(result.error){
         console.log(result.error)
        }else{

            const list=result.data;
          
            
            const absentStudents = students.filter(student => !list.some(attendance => attendance.studentId === student.studentId));
           
           
                setAttendance(absentStudents);
            
            
           
           
        }
      }
        )
    }
    useEffect(()=>{
   
       fetchAttendance();
     },[date])
    
  return (
   
       
   <>
     <Card>
          <div className='flex justify-between p-4'>
          <h2 className='text-2xl font-semibold capitalize'>absence</h2>
          <div className='flex gap-3'>
            <input type='date'  defaultValue={date}  className='outline-none border p-1 rounded-md cursor-pointer' onChange={datehandler}/>
           {
            /**
             <DropDawn list={hours}  disabled={false}  changeValue={setHourDefultValue} value={hourDefultValue}/>
             */
           }
          </div>
       </div>
        
        </Card>

        <Card>
        <div className='p-3 overflow-auto max-h-80'>
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
                <td className='capitalize p-2'>ID</td>
                    <td className='capitalize p-2'>nom</td>
                    <td className='capitalize p-2'>prénom</td>
                    <td className='capitalize p-2'>date de naissance</td>
                   
                </tr>
            </thead>
            <tbody >
              {
                attendances && attendances.map(attendance=>(
                  <>
                  <tr className='border-b even:bg-gray-100 font-medium' key={attendance.attendanceId}>
                <td className='capitalize p-2'>{attendance.studentId}</td>
                    <td className='capitalize p-2'>{attendance.lastname}</td>
                    <td className='capitalize p-2'>{attendance.firstname}</td>
                    <td className='capitalize p-2'>{attendance.birthdate}</td>
                  
                  
                 
                </tr>
                  </>
                ))
              }
            </tbody>
           </table>
        </div>
        </Card>
   </>
  )
}
