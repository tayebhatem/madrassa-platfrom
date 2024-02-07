import Card from "@/components/Card";
import DropDawn from "@/components/DropDawn";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { useState } from "react";


export default function Setting() {
  
    const list=[
        {
            id:1,
            name:'العربية'
        },
        {
            id:2,
            name:'Francais'
        },
        {
            id:3,
            name:'English'
        },
    ];
    const[darkMood,setDarkmood]=useState(false);
   const toogleDarkMood=()=>{
    setDarkmood(!darkMood);
   }
  return (
    <Layout>
   <Header/>
    <Card>
        <div className="max-w-md">
        <div className='flex flex-col gap-8 p-2'>
        


        <div className='flex items-center  gap-3'>
        <label className='text-lg  capitalize flex items-center gap-2 text-gray-500 w-44'>
        language
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
</svg>

        </label>
         <DropDawn list={list} value={list[1]}/>
    </div>

    <div className='flex items-center   gap-3 '>
    <label className='text-lg  capitalize flex items-center gap-2 text-gray-500 w-44'>
    humeur sombre
        </label>

        <label onClick={toogleDarkMood} className={darkMood?"flex flex-row-reverse justify-between items-center px-1 py-2 w-16 h-8 bg-gray-200 rounded-full cursor-pointer transition-all":"flex  justify-between items-center px-1 py-2 w-16 h-8 bg-gray-200 rounded-full cursor-pointer transition-all"}>
        {
            !darkMood ?<div className=" rounded-full ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
</svg>

        </div>:
        <div className="  rounded-full ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
</svg>


        </div>
        }
        
        </label>
        
    </div>

    
    <button className='text-lg p-2 flex items-center justify-between gap-2 text-gray-500 hover:bg-gray-100 rounded-md'>
        
        Changer le mot de passe
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
</svg>

    </button>

         </div>
        </div>
    </Card>
   </Layout>
  )
}
