import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { useDispatch } from "react-redux";
import { checkLoginStatus } from "./services/AuthService";
import UserList from "./components/UserList";
import SignupModal from "./components/SignupModal";
import Home from "./components/Home";
import About from "./components/About";
import { Announcement } from "./components/Announcement";
import { AnnouncementList } from "./components/AnnouncenetList";
import { AnnouncementDetails } from "./components/AnnouncementDetails";
const App = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkLoginStatus()); // ✅ Check login status on page load
      }, [dispatch]);
    
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/dashboard" element={<UserDashboard/>} />
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />
            <Route path="/admin/signup" element={<SignupModal />} />
            <Route path="/admin/userlist" element={<UserList/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/admin/annoucement" element={<Announcement/>} />
            <Route path="/annoucement-list" element={<AnnouncementList/>} />
            <Route path="/announcement/:id" element={<AnnouncementDetails />} />


        </Routes>
    </Router>
);
};


export default App;
