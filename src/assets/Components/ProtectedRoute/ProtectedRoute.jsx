import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) { //law m7ttsh a children hena hydrb error, l2n keda ana mosh 3mlalha destruct fmosh hywslha
    
  if(localStorage.getItem('userToken') !== null){
    //navigate to component
   <h1>test</h1>
    return children //al children bt3o alhwa gwah fe al app<3nd al path
  }else{
    //redirect to login
    return <>
    <Navigate to="/login">
    </Navigate>
   
    </>
    
  }
  

   }
