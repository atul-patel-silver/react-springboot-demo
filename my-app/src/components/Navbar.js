import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupModal from "./SignupModal"; // Ensure this component exists
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../services/AuthService";

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const loginUserRole = useSelector((state) => state.auth.loginUserRole);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser(dispatch);
        toast.success("✅ Successfully logged out! Thank you for your visit. See you soon! 👋", {
            style: {
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px",
                width: "600px",
            },
        });
        setTimeout(() => {
            navigate("/login")
        }, 1000);
    }
    return (
        <>
            <nav className="bg-gray-900 text-white py-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <Link to="/" className="text-2xl font-bold text-white">
                        MYAPP
                    </Link>
                    <ul className="flex space-x-6">


                        <li>
                            {loginUserRole === "ROLE_USER" ? (
                                <Link to="/user/dashboard" className="hover:text-blue-400 transition">
                                    Dashboard
                                </Link>
                            ) : loginUserRole === "ROLE_ADMIN" ? (
                                <Link to="/admin/dashboard" className="hover:text-blue-400 transition">
                                    Dashboard
                                </Link>
                            ) : (
                                <></> 
                            )}
                        </li>

                        {isLoggedIn ? (
                            <>
                                {/* <li><Link to="/admin/signup" className="">Add User</Link></li>

                                <li><Link to="/admin/userlist" className="">Users</Link></li> */}

                                <li><button onClick={handleLogout} className="">Logout</button></li>
                            </>

                        ) : (
                            <li><Link to="/login" className="">Login</Link></li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
