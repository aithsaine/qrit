import api from 'helpers/api'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Guest() {
    const [wait,setWait] = useState(true)
     const navigate = useNavigate()
    const isAuthenticate = async()=>{
        
        try {
            const {data} = await api.get("api/user")
           switch(data.user?.role)
           {
            case "admin":
                return navigate("/admin");
            default :return navigate("/employee")
           }
            
        } catch (error) {
            console.log(error)
            
        }
        finally{
            setWait(false)
        }
    }

    useEffect(()=>{
        isAuthenticate()
        
    })
    if(wait){
        return "loading..."
    }
  return (
   <>
   <Outlet/>
   </>
  )
}
