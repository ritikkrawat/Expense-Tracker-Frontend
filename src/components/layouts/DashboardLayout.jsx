import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu'; 

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect to login if user is not available
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null; // Prevent render flicker

    return (
        <div className=''>
            <Navbar activeMenu={activeMenu} />
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
                <div className='grow mx-5'>{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
