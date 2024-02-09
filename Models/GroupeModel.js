import Card from '@/components/Card'
import DropDawn from '@/components/DropDawn'
import NumberInput from '@/components/NumberInput'
import { levelsList } from '@/data/heighSchoolLevels'
import { specialitesList } from '@/data/speciality'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'

export default function GroupeModel({showModel,refrech}) {
    const session=useSession();
    const supabase=useSupabaseClient();
    const [groupeId,setGroupeId]=useState('');
    const [groupeNum,setGroupeNum]=useState('');
    const level=levelsList.find(item=>item.language==='french')?.levels;
    const speciality=specialitesList.find(speciality=>speciality.language==='french')?.specialites;
    const [specialites,setSpecialities]=useState(speciality);
    const [levelDefultValue,setLevelDefultValue]=useState(level[0]);
    const [specialityDefultValue,setSpecialityDefultValue]=useState(speciality[0][0]);
    

    const addGroupe=()=>{
      if (groupeId!='' && groupeNum!='') {
        supabase.from('groupe').insert({groupeId:groupeId,groupeNum:groupeNum,instituteId:session.user.id,level:levelDefultValue.id,speciality:specialityDefultValue.id}).then(
            result=>{
              if (result.error) {
                console.log(result.error)
              }else{
                showModel(false);
                refrech()
              }
            }
        )
      }
    }
    
    useEffect(()=>{
         if(levelDefultValue.id===1){
          setSpecialityDefultValue(speciality[0][0]);
          setSpecialities(speciality[0]);
         }else{
            setSpecialityDefultValue(speciality[1][0]);
            setSpecialities(speciality[1]);
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
        <DropDawn list={level} value={levelDefultValue} disabled={false} title={"Niveau"} changeValue={setLevelDefultValue}/>
        <DropDawn list={specialites} value={specialityDefultValue} disabled={false} title={"Specialité"} changeValue={setSpecialityDefultValue}/>
        <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={addGroupe} >Sauvegarder</button>
    </div>
   </Card>
  )
}
