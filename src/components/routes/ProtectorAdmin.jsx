import React from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectorAdmin = ({isAdmin}) => {
    if(!isAdmin.token || isAdmin.rol === "user"){
        return <Navigate to={'/'}></Navigate>
    }
    return <Outlet />
};

export default ProtectorAdmin;