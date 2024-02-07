import Card from '@/components/Card'
import Header from '@/components/Header'
import IdInput from '@/components/NumberInput'
import Layout from '@/components/Layout'
import React from 'react'

export default function Schoolyear() {
  return (
   <Layout>
     <Header/>
       <div className='flex flex-col gap-4'>
       <Card>
          <div className='flex justify-between p-4'>
          <h2 className='text-2xl font-semibold capitalize'>année scolaire</h2>
        
         <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md '  >Ajouter</button>
          </div>
        </Card>
        </div>
   </Layout>
  )
}
