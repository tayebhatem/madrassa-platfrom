import Card from '@/components/Card'
import DropDawn from '@/components/DropDawn'
import { levelsList } from '@/data/heighSchoolLevels';
import { specialitesList } from '@/data/speciality';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function ScheduleModel({showModel,refrech}) {
    const router=useRouter();
    const {id}=router.query;
    const daysList=[
        {
            language:'french',
            days:[
                {id:1, name:'Dimanche'},
                {id:2, name:'Lundi'},
                {id:3, name:'Mardi'},
                {id:4, name:'Mercredi'},
                {id:5, name:'Judi'}
            ]

        }
    ];
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
    ]
    const session=useSession();
    const supabase=useSupabaseClient();
    const [groups,setGroups]=useState('');
    const level=levelsList.find(item=>item.language==='french')?.levels;
    const speciality=specialitesList.find(speciality=>speciality.language==='french')?.specialites;
    const [hours,setHours]=useState([...hourList[0].hours[0],...hourList[0].hours[1]]);
    const [specialites,setSpecialities]=useState(speciality);
    const [dayDefultValue,setDayDefultValue]=useState(daysList[0].days[0]);
    const [hourDefultValue,setHourDefultValue]=useState(hourList[0].hours[0][0]);
    const [levelDefultValue,setLevelDefultValue]=useState(level[0]);
    const [groupeDefultValue,setGroupeDefultValue]=useState();
    const [specialityDefultValue,setSpecialityDefultValue]=useState(speciality[0][0]);
    const fetchGroups=()=>{
        const levelId=level.find(item=>item.name===levelDefultValue.name)?.id;
        const specialityId=specialites.flatMap(item=>item).find(speciality=>speciality.name===specialityDefultValue.name)?.id;

      supabase.from('groupe').select('groupeId,groupeNum').eq('level',levelId).eq('speciality',specialityId).eq('instituteId',session.user.id).then(
        result=>{

        if(!result.error){
            const formattedGroups = result.data.map(group => ({
                id: group.groupeId,
                name: group.groupeNum
            }));

            
            setGroups(formattedGroups);

           if(result.data.length===0){
            setGroupeDefultValue(null)
            
            
           }else{
            setGroupeDefultValue(groups[0])
           
           }
        }
        }
      );
    }
    const addSchedule=()=>{
        supabase.from('schedule').insert({goupeId:groupeDefultValue.id,teacherId:id,day:dayDefultValue.name,time:hourDefultValue.name}).then(
            result=>{
                
                    if(result.error){
                      console.log(result.error)
                    }else{
                        refrech()
                       showModel(false)
                    }
                
            }
        )
    }
    useEffect(()=>{
        if(levelDefultValue.id===1){
            setSpecialityDefultValue(speciality[0][0]);
            setSpecialities(speciality[0]);
           }else{
              setSpecialityDefultValue(speciality[1][0]);
              setSpecialities(speciality[1]);
           }
       
           fetchGroups();

    },[levelDefultValue])

    useEffect(()=>{
      fetchGroups();
    },[levelDefultValue,specialityDefultValue])
    useEffect(()=>{
       if(dayDefultValue.id===3){
        setHours(hourList[0].hours[0]);
        
       }else{
        setHours([...hourList[0].hours[0],...hourList[0].hours[1]]);
       }
    },[dayDefultValue])
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
        <div className='flex gap-4'>
        <div>
   <DropDawn list={level} value={levelDefultValue} disabled={false} title={"Niveau"} changeValue={setLevelDefultValue}/>
        <DropDawn list={specialites} value={specialityDefultValue} disabled={false} title={"Specialité"} changeValue={setSpecialityDefultValue}/>
        <DropDawn list={groups}  disabled={false} title={"numéro de groupe"} changeValue={setGroupeDefultValue} value={groupeDefultValue}/>
   </div>
        <div>
        <DropDawn list={daysList[0].days}  disabled={false} title={"joure"} changeValue={setDayDefultValue} value={dayDefultValue}/>
        <DropDawn list={hours}  disabled={false} title={"heure"} changeValue={setHourDefultValue} value={hourDefultValue}/>
        </div>
        </div>
 
        <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={addSchedule}  >Sauvegarder</button>
    </div>
   </Card>
  )
}
