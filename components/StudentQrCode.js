import React from 'react'
import { Page, Text, View, Document, StyleSheet,PDFDownloadLink,Image } from '@react-pdf/renderer';
import QRCode from 'qrcode-generator';
export default function StudentQrCode({student}) {
    
      const qrCodeId = `${student.studentId}`;
      const qr = QRCode(0, 'M'); 
      qr.addData(qrCodeId); 
      qr.make(); 
      const sizeMultiplier = 8; 
      const qrcode=qr.createDataURL(sizeMultiplier);
      const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          alignItems:'center',
          justifyContent:'center',
          backgroundColor: '#fff',
          padding:10
        },
       

      });

  return (
    <Document>
    <Page size="A4" style={styles.page}>
        <Text >Matricule : {student.studentId}</Text>
        <Text >Nom : {student.lastname}</Text>
        <Text >Prénom : {student.firstname}</Text>
        <Image src={qrcode}/>
    </Page>
  </Document>
  )
}
