import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';


function ProtuctedRoute({children}) {
    const location = useLocation()
    const { loggedInUser } = useSelector(state => state.auth)

    return  loggedInUser ? children : <Navigate to='/login' state={{ path:location.pathname}}/>

}

export default ProtuctedRoute