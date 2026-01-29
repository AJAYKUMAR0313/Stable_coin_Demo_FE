import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'

export default function DashboardLayout() {
    const [email, setEmail] = useState('');

    const user = {
        name: localStorage.getItem('username'),
        email: email,
        wallet_address: localStorage.getItem('wallet_address'),
    }

    const getdetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/auth/${localStorage.getItem("userID")}`,
            );
            setEmail(response.data.email);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        getdetails();
    },[]);


  return (
     <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
