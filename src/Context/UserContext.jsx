import { createContext, useEffect, useState } from "react";
import Home from "../assets/Components/Home/Home";
import Products from "../assets/Components/Products/Products";
export let UserContext = createContext(0);

export default function UserContextProvider(props){
   const [userLogin, setuserLogin] = useState(null) //the user won't be loged in fl2wl fhtb2a null

   useEffect(() => {
     if (localStorage.getItem('userToken') !== null) {
         setuserLogin(localStorage.getItem('userToken'))
     }
    
    }, [])
  

    return <UserContext.Provider value={ {userLogin , setuserLogin } }> 
         {props.children}
    </UserContext.Provider>

}