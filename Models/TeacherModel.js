import Card from '@/components/Card'
import DropDawn from '@/components/DropDawn'
import NameEnput from '@/components/NameEnput'
import { subjects } from '@/data/subjects';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React from 'react'
import { useState } from 'react';
export default function TeacherModel({showModel,refrech}) {
    const session=useSession();
    const supabase=useSupabaseClient();
    const list = subjects.find(subject => subject.language === 'french').subjects;
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [subject,setSubject]=useState(list[0]);
    const addTeacher=()=>{
       if(firstName!=='' && lastName!==''){
        supabase.from('teacher').insert({firstname:firstName,lastname:lastName,subject:subject.id,instituteId:session.user.id}).then(
            result=>{
                if (!result.error) {
                    refrech();
                    showModel(false);
                }
            }
           );
       }
    }
    return (
  
     <Card>
    <div className='flex flex-col gap-2 p-3'>
    <div className='flex flex-row-reverse'>
    <button onClick={()=>showModel(false)} className=''>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

    </button>
    </div>
        <NameEnput title={"Nom"} placeholder={"Nom"} name={lastName} changeName={setLastName}/>
        <NameEnput title={"Prénom"} placeholder={"Prénom"} name={firstName} changeName={setFirstName}/>
        <DropDawn list={list} value={subject} disabled={false} title={"matiere"} changeValue={setSubject}/>
        <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={addTeacher} >Sauvegarder</button>
    </div>
   </Card>

  )
}
