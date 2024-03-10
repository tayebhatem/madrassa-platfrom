import Card from '@/components/Card';
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react'
import Login from './login';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import PostModel from '@/Models/PostModel';
import { checkAccount } from '@/helpers';
import { useRouter } from 'next/router';

export default function Publication() {
  const [showModel, setShowModel] = useState(false);
  const[posts,setPosts]=useState([])
    const session=useSession();
    const supabase=useSupabaseClient();
    const router=useRouter();
    const deletePost=(id)=>{
      supabase.from('posts').delete().eq('postId',id).then(
        result=>{
          if(!result.error){
           fetchPosts()
          }
        }
      )
    }
    const fetchPosts=()=>{
      if(session){
       supabase.from('posts').select('*').eq('userId',session.user.id).then(
         result=>{
             if (!result.error) {
                 setPosts(result.data);
             }else{
                 console.log(result.error)
             }
         }
      )
      }
     }
     useEffect(()=>{
    fetchPosts();

   },[])
   if (!session) {
     return <Login/>
     
   }else{
     checkAccount(supabase,router,session.user.id);
     fetchPosts();
   }
  return (
    <>
      {
      showModel && 
      <>
      <div className='absolute bg-black w-full h-full z-10 opacity-30'></div>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 '>
      <PostModel showModel={setShowModel} refrech={fetchPosts}/>
      </div>
      </>
     }
     <Layout>
    
    <div className='flex flex-col gap-4'>
    <Card>
       <div className='flex justify-between p-4'>
       <h2 className='text-2xl font-semibold capitalize'>Publication</h2>
     
      <button className='bg-primary text-white shadow-md py-2 px-6 text-md  self-center rounded-md '  onClick={()=>setShowModel(true)} >Ajouter</button>
       </div>
     </Card>
     <div className='flex flex-col w-full '>
  {
    posts && posts.map(post=>(
      <>
      <Card key={post.postId}>
    <div className='flex gap-2 p-3'>
      <div className='grow'>
      <div className='text-gray-400'>{post.date}</div>
    <div className='text-lg'>{post.context}</div>
      </div>
      <button  className='' onClick={()=>deletePost(post.postId)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#444" class="w-6 h-6">
  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
</svg>
    </button>
    </div>
  </Card>
      </>
    ))
  }
     </div>
     </div>
</Layout>
    </>
   
  )
}
