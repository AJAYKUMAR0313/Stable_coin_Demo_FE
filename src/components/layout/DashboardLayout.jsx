import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import NavButtons from "../../pages/NavButtons.jsx";

export default function DashboardLayout() {
  const [email, setEmail] = useState("");

  const user = {
    name: localStorage.getItem("username"),
    email: email,
    wallet_address: localStorage.getItem("wallet_address"),
  };

  const getdetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/auth/${localStorage.getItem("userID")}`,
      );
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getdetails();
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Header user={user} />
      <NavButtons />
      {/* Scrollable content area */}
      <main className="flex-1 overflow-y-auto p-2">
        <Outlet />
      </main>
    </div>
  );
}
