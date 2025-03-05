import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "../services/AdminService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "./Loader";

const SignupModal = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        emailId: "",
        password: "",
        confirmPassword: "",
        roleName: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.userName) newErrors.userName = "Username is required";
        if (!formData.emailId) newErrors.emailId = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        setErrors({});
        try {
            await signup(formData, setErrors, navigate);
            toast.success("🎉 User added successfully!", {
                style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px",
                    width: "380px",
                },
            });

            setTimeout(() => {
                navigate("/admin/userlist")
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative px-4 overflow-hidden">
            {/* Animated Background Effects */}

            {isLoading && (
                <Loader />
            )}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-16 w-28 h-28 bg-blue-500 opacity-40 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-36 h-36 bg-purple-500 opacity-50 blur-[140px] rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-green-500 opacity-30 blur-[120px] rounded-full animate-pulse"></div>
            </div>

            {/* Glassmorphic Signup Box */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative bg-white/10 backdrop-blur-lg shadow-2xl p-10 rounded-3xl border border-white/20 w-full max-w-xl text-white"
            >
                {/* Floating Glow Effect */}
                <div className="absolute inset-0 border-2 border-blue-500 opacity-20 rounded-3xl animate-pulse pointer-events-none"></div>

                <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-400 drop-shadow-[0_0_15px_#3b82f6]">
                    Sign Up
                </h2>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="flex space-x-4">
                        <div className="relative w-1/2">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-15 border border-transparent rounded-lg text-white placeholder-white placeholder-opacity-70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1 font-bold">{errors.firstName}</p>}
                        </div>

                        <div className="relative w-1/2">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-15 border border-transparent rounded-lg text-white placeholder-white placeholder-opacity-70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1 font-bold">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="userName"
                            placeholder="Username"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-15 border border-transparent rounded-lg text-white placeholder-white placeholder-opacity-70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                        {errors.userName && <p className="text-red-500 text-sm mt-1 font-bold">{errors.userName}</p>}
                    </div>

                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="emailId"
                            placeholder="Email"
                            value={formData.emailId}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-15 border border-transparent rounded-lg text-white placeholder-white placeholder-opacity-70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                        {errors.emailId && <p className="text-red-500 text-sm mt-1 font-bold">{errors.emailId}</p>}
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-15 border border-transparent rounded-lg text-white placeholder-white placeholder-opacity-70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1 font-bold">{errors.password}</p>}
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-15 border border-transparent rounded-lg text-white placeholder-white placeholder-opacity-70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 font-bold">{errors.confirmPassword}</p>}
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.8)" }}
                        transition={{ duration: 0.3 }}
                        className="w-full py-3 font-bold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"
                    >
                        Add User
                    </motion.button>
                </form>
            </motion.div>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default SignupModal;
