import Card from "@/components/Card";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Login from "./login";

import Information from "./information";

export default function Home() {
  const router=useRouter();
  const pathname=router.pathname;
  const session=useSession();
  const supabase=useSupabaseClient();
  const [information,setInformation]=useState(false);
  
  useEffect(()=>{

     
    
  },[])
  if (!session) {
    return <Login/>
  }else{
    supabase.from('institute').select('*').eq('userId',session.user.id).then(
      result=>{
        
        if (result.data===null) {
        router.push('/information');
         
        }
      }
    )
  }
  return (
    
    information?<Information/>:
    <Layout>
  
    <Header/>
    <div className="flex gap-2">

    <Card>
    <div className="grow flex justify-between bg-pink-400  rounded-md p-3 text-white">
    <div>
    <div className="text-4xl font-medium ">200</div>
      <div className="text-xl my-3">
       Nombre d'étudiants
       </div>
    </div>

      <div className="">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 opacity-40">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>
      </div>
    </div>
     </Card>

     <Card>
    <div className="grow flex justify-between bg-blue-400  rounded-md p-3 text-white">
    <div>
    <div className="text-4xl font-medium ">20</div>
      <div className="text-xl my-3">
       Nombre d'étudiants
       </div>
    </div>

      <div className="">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 opacity-40">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
</svg>

      </div>
    </div>
     </Card>

   
    </div>
      
     
  
  </Layout>
  );
}
