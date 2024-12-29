import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const DashboardRoute = () => {

    const loggedInUser = JSON.parse(localStorage.getItem('profile'))

    return loggedInUser?.data?.role === "Seller" ? <Outlet/> : <Navigate to='/login'  state={{path: '/dashboard'}}/> 
}

export default DashboardRoute