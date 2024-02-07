import Card from '@/components/Card'
import DropDawn from '@/components/DropDawn'
import NumberInput from '@/components/NumberInput'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'

export default function GroupeModel({showModel,refrech}) {
    const session=useSession();
    const supabase=useSupabaseClient();
    const [groupeId,setGroupeId]=useState();
    const [groupeNum,setGroupeNum]=useState();
    const addGroupe=()=>{
        supabase.from('groupe').insert({groupeId:groupeId,groupeNum:groupeNum,instituteId:session.user.id,level:levelDefultValue.id,speciality:specialityDefultValue.id}).then(
            result=>{
              if (result.error) {
                console.log(result.error)
              }else{
                showModel(false);
              }
            }
        )
    }
    const levelsList=[
        {
         language:'french',
         levels:[
             {
                 id:1,
                 name:'1er'
             },
             {
                 id:2,
                 name:'2éme'
             },
             {
                 id:3,
                 name:'3éme'
             },
         ]
        }
     ]
     const specialitesList=[
         {
             language:'french',
             specialites:[
                 
                     [
                         { id: 1, name: 'Science et technologie' },
                         { id: 2, name: 'Littérature' }
                     ],
                     [
                         { id: 3, name: 'Sciences expérimentales' },
                         { id: 4, name: 'Littérature et philosophie' },
                         { id: 5, name: 'Mathématiques' },
                         { id: 6, name: 'Mathématiques techniques' },
                         { id: 7, name: 'Langues etrangeres' },
                         { id: 8, name: 'Gestion et économie' }
                     ]
                 
                 
             ]
 
         }
     ];
    const [levelDefultValue,setLevelDefultValue]=useState(levelsList[0].levels[0]);
    const [specialityDefultValue,setSpecialityDefultValue]=useState(specialitesList[0].specialites[0][0]);
    const [specialites,setSpecialities]=useState(specialitesList[0].specialites[0]);
    
    useEffect(()=>{
         if(levelDefultValue.id===1){
          setSpecialityDefultValue(specialitesList[0].specialites[0][0]);
          setSpecialities(specialitesList[0].specialites[0]);
         }else{
            setSpecialityDefultValue(specialitesList[0].specialites[1][0]);
            setSpecialities(specialitesList[0].specialites[1]);
         }
    },[levelDefultValue])
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
         <NumberInput title={"ID"} placeholder={"ID"} number={groupeId} changeNumber={setGroupeId}/>
         <NumberInput title={"numéro de groupe"} placeholder={"numéro de groupe"} number={groupeNum} changeNumber={setGroupeNum}/>
        <DropDawn list={levelsList[0].levels} value={levelDefultValue} disabled={false} title={"Niveau"} changeValue={setLevelDefultValue}/>
        <DropDawn list={specialites} value={specialityDefultValue} disabled={false} title={"Specialité"} changeValue={setSpecialityDefultValue}/>
        <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={addGroupe} >Sauvegarder</button>
    </div>
   </Card>
  )
}
