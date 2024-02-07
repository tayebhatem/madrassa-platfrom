import React from 'react'
import Navigation from './Navigation'


export default function Layout({children}) {
    
  return (
    <div className="relative flex h-screen p-2 bg-primary">
    <Navigation/>
    <main className="bg-secondary grow rounded-md p-2 transition-all">
    {children}
    </main>
    
   </div>
  )
}
