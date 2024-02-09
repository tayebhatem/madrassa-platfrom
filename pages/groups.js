import GroupeModel from '@/Models/GroupeModel'
import Card from '@/components/Card'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { levelsList } from '@/data/heighSchoolLevels'
import { specialitesList } from '@/data/speciality'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import Login from './login'



export default function Groups() {
  const supabase=useSupabaseClient();
    const session=useSession();
  const router=useRouter()
  const levels=levelsList.find(item=>item.language==='french')?.levels;
  const specialites=specialitesList.find(speciality=>speciality.language==='french')?.specialites;
  const [showModel, setShowModel] = useState(false);
  const [groups,setGroups]=useState([]);
  const deleteGroup=(id)=>{
    supabase.from('groupe').delete().eq('groupeId',id).then(
      result=>{
        if(!result.error){
         fetchGroups()
        }
      }
    )
  }
  const handleSearch=(e)=>{
    const value = e.target.value.toLowerCase();    
    if(value){
       const filteredResults = groups.filter(
           (groupe) =>
            String(groupe.groupeId).toLowerCase().includes(value) ||
             String(groupe.groupeNum).toLowerCase().includes(value) ||
             levels.find(level=>level.id===groupe.level)?.name.toLowerCase().includes(value) ||
             specialites.flatMap(item=>item).find(speciality=>speciality.id===groupe.speciality)?.name.toLowerCase().includes(value) 

         );
         setGroups(filteredResults);
    }else{
       fetchGroups();
    }
    

   }
   const fetchGroups=()=>{
   if(session){
    supabase.from('groupe').select('*').eq('instituteId',session.user.id).then(
      result=>{
          if (!result.error) {
              setGroups(result.data);
          }else{
              console.log(result.error)
          }
      }
   )
   }
   }
  
   useEffect(()=>{
  
    fetchGroups();
    
 },[]);

 if (!session) {
  return <Login/>
  
}else{
  fetchGroups();
}
  return (
  <>
  {
      showModel && 
      <>
      <div className='absolute bg-black w-full h-full z-10 opacity-30'></div>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-96 flex'>
      <GroupeModel showModel={setShowModel} refrech={fetchGroups}/>
      </div>
      </>
     }
      <Layout>
   
       <div className='flex flex-col gap-4'>
       <Card>
          <div className='flex justify-between p-4'>
          <h2 className='text-2xl font-semibold capitalize'>Classes</h2>
        
         <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={()=>setShowModel(true)} >Ajouter</button>
          </div>
        </Card>
        <Card>
        <div className='p-3'>
        <div className='bg-gray-100 rounded-md p-2 flex gap-1 max-w-sm mb-4'>
            <input type='text' className='grow bg-transparent outline-none'  onChange={handleSearch}/>
            <div className='text-gray-400'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
            </div>

        </div>
           <table className='w-full h-28  overflow-scroll'>
            <thead className='font-bold bg-gray-100 '>
                <tr >
                <td className='capitalize p-2'>ID</td>
                    <td className='capitalize p-2'>niveau</td>
                    <td className='capitalize p-2'>specialité</td>
                    <td className='capitalize p-2'>numéro de groupe</td>
                    <td className='capitalize p-2'>étudiants</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
              {
                groups.map(groupe=>(
                    <>
                    <tr className='border-b' key={groupe.groupeId}>
                    <td className='capitalize p-2 font-medium truncate max-w-36'>{groupe.groupeId}</td>
                    <td className='capitalize p-2 font-medium truncate max-w-36'>{levels.find(level=>level.id===groupe.level)?.name}</td>
                    <td className='capitalize p-2 font-medium truncate max-w-36'>{specialites.flatMap(item=>item).find(speciality=>speciality.id===groupe.speciality)?.name}</td>
                    <td className='capitalize p-2 font-medium truncate max-w-36'>{groupe.groupeNum}</td>
                    <td>
                   <button onClick={()=>router.push('/students?id='+groupe.groupeId)}>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
  <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
</svg>
                   </button>


                  </td>
                    <td>
                    <button onClick={()=>deleteGroup(groupe.groupeId)}>
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
