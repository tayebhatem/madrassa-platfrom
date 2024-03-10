import Card from '@/components/Card'
import Layout from '@/components/Layout'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router'
import * as XLSX from 'xlsx';
import html2pdf from "html2pdf.js";
import QRCode from 'qrcode-generator';
import React, { useEffect, useState } from 'react'
import { levelsList } from '@/data/heighSchoolLevels';
import { specialitesList } from '@/data/speciality';



export default function StudentList() {
  const levels=levelsList.find(item=>item.language==='french')?.levels;
  const specialites=specialitesList.find(speciality=>speciality.language==='french')?.specialites;
  const router=useRouter();
  const {id}=router.query;
  const[loading,setLoading]=useState(false);
  const[students,setStudents]=useState([]);
  const[groupe,setGroupe]=useState({});
  const session=useSession()
 const supabase=useSupabaseClient();

 const generateGrCode=(data)=>{
  const qrCodeId = `${data}`;
  const qr = QRCode(0, 'M'); 
  qr.addData(qrCodeId); 
  qr.make(); 
  const sizeMultiplier = 8; 
   return qr.createDataURL(sizeMultiplier);
}

 const printStudents =  () => {
  setLoading(true);
  try {
    let mergedContent = '<html><head></head><body >'; 
    for (const student of students) {
     
 const qrImage = generateGrCode(student.studentId); ; 
      const content = `
      <div class="pdf-page">
      <div class="pdf-content">
      <p >Matricule : ${student.studentId}</p>
      <p >Nom : ${student.lastname}</p>
      <p >Prénom : ${student.firstname}</p>
      <p >Date de naissance : ${student.birthdate}</p>
      <p >Classe :${levels.find(level=>level.id===groupe.level)?.name} ${specialites.flatMap(item=>item).find(speciality=>speciality.id===groupe.speciality)?.name} ${groupe.groupeNum}</p> 
      <img  src="${qrImage}" />
    </div>
    <div>`;
      mergedContent += content; 
    }
    mergedContent += '</body></html>'; 
    html2pdf()
.from(mergedContent)
.outputPdf('blob') 
.then((pdfBlob) => {
  const blobURL = URL.createObjectURL(pdfBlob);
  const printWindow = window.open(blobURL);
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print(); 
      setLoading(false);
    };
  } else {
    console.error('Failed to open print window.');
  }
});
  } catch (err) {
    console.error(err);
  }
};

 const handlePrintStudent = (student) => {
  const qrImage = generateGrCode(student.studentId); 
  const content = `
    <div class="pdf-content">
      <p >Matricule : ${student.studentId}</p>
      <p >Nom : ${student.lastname}</p>
      <p >Prénom : ${student.firstname}</p>
      <p >Date de naissance : ${student.birthdate}</p>
      <p >Classe :${levels.find(level=>level.id===groupe.level)?.name} ${specialites.flatMap(item=>item).find(speciality=>speciality.id===groupe.speciality)?.name} ${groupe.groupeNum}</p>
      <img  src="${qrImage}" />
    </div>`;
  html2pdf()
    .from(content)
    .outputPdf('blob') // Generate a Blob object
    .then((pdfBlob) => {
      const blobURL = URL.createObjectURL(pdfBlob);
      const printWindow = window.open(blobURL);
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print(); // Print the PDF
       
        };
      } else {
        console.error('Failed to open print window.');
      }
    });

};
 const deleteStudent=(id)=>{
  supabase.from('student').delete().eq('studentId',id).then(
    result=>{
      if(!result.error){
       fetchStudents()
      }
    }
  )
}
const handleSearch=(e)=>{
  const value = e.target.value.toLowerCase();    
  if(value){
     const filteredResults = students.filter(
         (student) =>
         String(student.studentId).toLowerCase().includes(value) ||
         student.lastname.toLowerCase().includes(value) ||
         student.firstname.toLowerCase().includes(value) ||
         student.birthdate.toLowerCase().includes(value)
       );
       setStudents(filteredResults);
  }else{
     fetchStudents();
  }
  

 }
 const insertStudent=async(student)=> {
    const idStudent = parseInt( student[0], 10);
     const fname = student[2];
     const lname = student[1];
     const birth = student[3];
    try {
      const { data, error } = await supabase
        .from('student')
        .insert([{ studentId: idStudent,groupeId:id, firstname: fname, lastname: lname,birthdate:birth, instituteId: session.user.id }]).then(
          result=>{
            if(!result.error){
              fetchStudents(session.user.id);
            }else{
              console.log(result.error)
            }
          }
        );
        
    
    } catch (error) {
     
    }
  };

  const handleFileUpload =async (e) => {
    try {
      const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload =async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const desiredSheetName = id;
      
      const sheet = workbook.Sheets[desiredSheetName]; 
     const jsonData = XLSX.utils.sheet_to_json(sheet,{ header: 1, range: 8 });
          
       jsonData.forEach((student, index) => {     
        
       insertStudent(student);        
    });
    }

    
    reader.readAsArrayBuffer(file);

    } catch (error) {
      
    }
    
  };
  const fetchStudents=()=>{
    if(session){
      supabase.from('student').select('*').eq('groupeId',id).then(
        result=>{
          if(!result.error){
            setStudents(result.data);
          }
        }
      )
    }
  }
 
  const fetchGroupe=()=>{
   if(session){
    supabase.from('groupe').select('*').eq('groupeId',id).single().then(
      result=>{
          if (!result.error) {
           setGroupe(result.data);
          }else{
              console.log(result.error)
              
          }
      }
   )
   }
   }
  useEffect(()=>{
   
     fetchGroupe();
    fetchStudents();
  },[])
  
  return (
    
     
       <>
        <Card>
          <div className='flex justify-between p-4'>
          <h2 className='text-2xl font-semibold capitalize'>étudiants</h2>
       <div className='flex gap-4 items-center'>
       <label className='bg-white border-2 font-medium capitalize flex items-center gap-2 border-primary text-primary shadow-md py-2 px-6 text-md  self-center rounded-md cursor-pointer '   >
         importer
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
</svg>

         <input type='file' className='hidden' onChange={handleFileUpload}/>
         </label>
         <button className='bg-primary text-white border-2 flex items-center gap-2 border-primary shadow-md py-2 px-6 text-md  self-center rounded-md capitalize font-medium' onClick={printStudents} >
         imprimier
         {
         loading? <div class="w-5 h-5 border-4   animate-spin   border-t-blue-400 rounded-full"></div>:
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
</svg>
         }
       

         </button>
       </div>
          </div>
         
         
        </Card>
        <Card>
        <div className='p-3 overflow-auto max-h-80'>
        <div className='bg-gray-100 rounded-md p-2 flex gap-1 max-w-sm mb-4'>
            <input type='text' className='grow bg-transparent outline-none' onChange={handleSearch}/>
            <div className='text-gray-400'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
            </div>

        </div>
           <table className='w-full'>
            <thead className='font-bold bg-gray-100 '>
                <tr className='border-b'>
                <td className='capitalize p-2'>ID</td>
                    <td className='capitalize p-2'>nom</td>
                    <td className='capitalize p-2'>prénom</td>
                    <td className='capitalize p-2'>date de naissance</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody >
              {
                students.map(student=>(
                  <>
                  <tr className='border-b even:bg-gray-100 font-medium' key={student.studentId}>
                <td className='capitalize p-2'>{student.studentId}</td>
                    <td className='capitalize p-2'>{student.lastname}</td>
                    <td className='capitalize p-2'>{student.firstname}</td>
                    <td className='capitalize p-2'>{student.birthdate}</td>
                    <td>
                    <button onClick={()=>handlePrintStudent(student)} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
</svg>

                    </button>

                  </td>
                    <td>
                    <button onClick={()=>deleteStudent(student.studentId)}>
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
       </>
       
  )
}
