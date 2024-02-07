import GroupeModel from '@/Models/GroupeModel'
import Card from '@/components/Card'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { useState } from 'react'


export default function Groups() {
  const [showModel, setShowModel] = useState(false);
  return (
  <>
  {
      showModel && 
      <>
      <div className='absolute bg-black w-full h-full z-10 opacity-30'></div>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-96 flex'>
      <GroupeModel showModel={setShowModel}/>
      </div>
      </>
     }
      <Layout>
     <Header/>
       <div className='flex flex-col gap-4'>
       <Card>
          <div className='flex justify-between p-4'>
          <h2 className='text-2xl font-semibold capitalize'>Classes</h2>
        
         <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md ' onClick={()=>setShowModel(true)} >Ajouter</button>
          </div>
        </Card>
        </div>
   </Layout>

  </>
  )
}
