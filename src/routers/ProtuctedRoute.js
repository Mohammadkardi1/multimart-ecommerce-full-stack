import React from 'react'
import useAuth from '../custom-hooks/UseAuth'
import { Navigate, useLocation } from 'react-router-dom'


function ProtuctedRoute({children}) {
    const location = useLocation()
    const {currentUser} = useAuth()
    console.log(currentUser)


    return  currentUser ? children : <Navigate to='/login' state={{ path:location.pathname}}/>
    
}

export default ProtuctedRoute