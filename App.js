import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";  
import Home from "./pages/Home";  
import Login from "./pages/Login";  
import Signup from "./pages/Signup";  
import Booking from "./pages/Booking";  
import StylistAvailability from "./pages/StylistAvailability";
import Layout from "./components/Layout";
import MpesaPayment from "./components/MpesaPayment";  

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>  {}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/stylist-availability" element={<StylistAvailability />} />
            <Route path="/mpesa-payment" element={<MpesaPayment />} />  {}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
