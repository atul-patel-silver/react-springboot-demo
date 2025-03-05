import React, { useState } from "react";
import { login } from "../services/AuthService";
import { FaUser, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Loader from "./Loader";
// import { GoogleLogin } from "@react-oauth/google";
// import { GitHubLoginButton } from "@react-oauth/github";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        setErrors({});

        console.log("🚀 Login button clicked ✅");

        try {
            const response = await login(username, password, setErrors, navigate, dispatch);
            console.log("🔹 Login Response:", response);

            toast.success("🎉 Successfully logged in! Welcome back! 🎊", {
                style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px",
                    width: "380px",
                },
            });

            setTimeout(() => {
                if (response?.role === "ROLE_USER") {
                    navigate("/user/dashboard");
                } else {
                    navigate("/admin/dashboard");
                }
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            console.error("❌ Login Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative px-4 overflow-hidden">
            {isLoading && (
                <Loader />
            )}
            {/* Animated Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-16 w-28 h-28 bg-blue-500 opacity-40 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-36 h-36 bg-purple-500 opacity-50 blur-[140px] rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-green-500 opacity-30 blur-[120px] rounded-full animate-pulse"></div>
            </div>

            {/* Glassmorphic Login Box */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative bg-white/10 backdrop-blur-lg shadow-2xl p-10 rounded-3xl border border-white/20 w-full max-w-xl text-white"
            >
                {/* Floating Glow Effect */}
                <div className="absolute inset-0 border-2 border-blue-500 opacity-20 rounded-3xl animate-pulse pointer-events-none"></div>

                <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-400 drop-shadow-[0_0_15px_#3b82f6]">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative group">
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition group-hover:text-blue-400" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-15 border border-transparent rounded-lg text-white placeholder-white placeholder-opacity-70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition group-hover:shadow-blue-400 group-hover:shadow-md"
                        />
                        {errors.userName && <p className="text-red-500 text-sm mt-1 font-bold">{errors.userName}</p>}
                    </div>

                    <div className="relative group">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition group-hover:text-pink-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-15 border border-transparent rounded-lg text-white placeholder-white placeholder-opacity-70 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:outline-none transition group-hover:shadow-pink-400 group-hover:shadow-md"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1 font-bold">{errors.password}</p>}
                    </div>

                    <motion.button
                        type="submit"
                        onClick={() => console.log("🔥 Button clicked!")}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.8)" }}
                        transition={{ duration: 0.3 }}
                        className="w-full py-3 font-bold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition duration-300 shadow-lg pointer-events-auto relative"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur-md animate-pulse"></span>
                        <span className="relative z-10">Sign In</span>
                    </motion.button>

                    <p className="text-center mt-4">
                        <a href="#s" className="text-pink-400 font-bold hover:underline">
                            Forgot Password?
                        </a>
                    </p>
                </form>

                {/* Social Login Buttons - Properly Centered & Styled */}
                <div className="mt-6 flex flex-col items-center w-full">
                    <p className="text-gray-400 mb-3">or continue with</p>

                    <div className="w-full flex flex-col space-y-3">
                        {/* Google Sign-in Button */}
                        <button className="w-full flex items-center justify-center gap-3 py-2 px-4 text-sm sm:text-base font-medium rounded-lg bg-[#DB4437] hover:bg-[#C1351D] transition-all duration-300 shadow-md text-white focus:ring-2 focus:ring-red-500 focus:outline-none">
                            <FaGoogle size={18} />
                            <span>Sign in with Google</span>
                        </button>

                        {/* GitHub Sign-in Button */}
                        <button className="w-full flex items-center justify-center gap-3 py-2 px-4 text-sm sm:text-base font-medium rounded-lg bg-[#24292E] hover:bg-[#1B1F23] transition-all duration-300 shadow-md text-white focus:ring-2 focus:ring-gray-600 focus:outline-none">
                            <FaGithub size={18} />
                            <span>Sign in with GitHub</span>
                        </button>
                    </div>
                </div>
            </motion.div>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>

    );
};

export default Login;
