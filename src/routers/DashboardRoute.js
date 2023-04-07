import React from 'react'
import useAuth from '../custom-hooks/UseAuth'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const DashboardRoute = () => {

    const {currentUser} = useAuth()


    return currentUser ? <Outlet/> : <Navigate to='/login'  state={{path: '/dashboard'}}/> 
}

export default DashboardRoute