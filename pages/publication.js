import Card from '@/components/Card';
import Layout from '@/components/Layout';
import React from 'react'
import Login from './login';
import { useSession } from '@supabase/auth-helpers-react';

export default function Publication() {
    const session=useSession();
    if (!session) {
      return <Login/>
      
    }
  return (
    <Layout>
    
    <div className='flex flex-col gap-4'>
    <Card>
       <div className='flex justify-between p-4'>
       <h2 className='text-2xl font-semibold capitalize'>Publication</h2>
     
      <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md '  >Ajouter</button>
       </div>
     </Card>
     </div>
</Layout>
  )
}
