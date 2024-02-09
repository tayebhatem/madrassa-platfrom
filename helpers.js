
export const checkAccount=async(supabase,router,id)=>{
    
    const { data: { user } } = await supabase.auth.getUser();
    if(user){
      supabase.from('institute').select('*').eq('userId',id).single().then(
        result=>{
          
          if (result.data===null) {
            
          router.push('/information');
           
          }
        }
      )
   }
   }

 