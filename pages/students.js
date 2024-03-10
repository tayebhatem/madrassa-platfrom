import Card from '@/components/Card'
import Layout from '@/components/Layout'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router'
import * as XLSX from 'xlsx';
import html2pdf from "html2pdf.js";
import QRCode from 'qrcode-generator';
import React, { useEffect, useState } from 'react'
import { levelsList } from '@/data/heighSchoolLevels';
import { specialitesList } from '@/data/speciality';
import Login from './login';
import Link from 'next/link';
import StudentList from '@/components/StudentList';
import Attendance from '@/components/Attendance';

export default function Students() {
  const levels=levelsList.find(item=>item.language==='french')?.levels;
  const specialites=specialitesList.find(speciality=>speciality.language==='french')?.specialites;
  const router=useRouter();
  const {id}=router.query;
  const[loading,setLoading]=useState(false);
  const[students,setStudents]=useState([]);
 
  const session=useSession()
 const supabase=useSupabaseClient();
 const [showStudents,setShowStudents]=useState(true);
 
 const toggleDispalyStudents=()=>{
  setShowStudents(!showStudents)
 }

  const fetchStudents=()=>{
    if(session){
      supabase.from('student').select('*').eq('groupeId',id).then(
        result=>{
          if(!result.error){
            setStudents(result.data);
          }
        }
      )
    }
  }
 
  
  
  if (!session) {
    return <Login/>
    
  }else{
   
    fetchStudents();
  }
  return (
    <Layout>
      <div className='flex flex-col gap-4'>
      <div className='flex'>
    <button className={showStudents?'text-primary  font-semibold border-b-4 border-primary pb-2 px-2 capitalize text-lg':'text-gray-400 font-semibold border-b-4 border-gray-400 pb-2 px-2 capitalize text-lg'} onClick={toggleDispalyStudents}>étudiants</button>
    <button className={!showStudents?'text-primary  font-semibold border-b-4 border-primary pb-2 px-2 capitalize text-lg':'text-gray-400 font-semibold border-b-4 border-gray-400 pb-2 px-2 capitalize text-lg'} onClick={toggleDispalyStudents}>absence</button>
          </div>
     {
      showStudents? <StudentList students={students} setStudents={setStudents}/>:<Attendance students={students}/>
     }
       </div>
    </Layout>
  )
}
