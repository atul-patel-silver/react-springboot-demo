import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden text-white px-6">
            {/* Background Dynamic Glows */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-20 w-20 h-20 bg-blue-500 opacity-40 blur-[90px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-500 opacity-40 blur-[120px] rounded-full animate-ping"></div>
                <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-purple-500 opacity-30 blur-[100px] rounded-full animate-bounce"></div>
            </div>

            {/* Animated Rotating Light Beams */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/30 via-transparent to-purple-900/40 animate-spin-slow"></div>

            {/* Glassmorphic Container with Hover Tilt */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
                className="relative text-center max-w-3xl bg-white/10 backdrop-blur-3xl shadow-2xl p-12 rounded-3xl border border-white/20 transition-transform duration-300 transform-gpu"
            >
                {/* Neon Border Effect */}
                <div className="absolute inset-0 border-2 border-indigo-500 opacity-20 rounded-3xl animate-pulse"></div>

                {/* Animated Heading */}
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl font-extrabold drop-shadow-lg tracking-wide"
                >
                    Welcome to  
                    <span className="text-blue-400 drop-shadow-[0_0_15px_#3b82f6]"> MyApp</span> 🚀
                </motion.h1>
                <p className="mt-4 text-lg text-white/80">
                    Manage everything effortlessly with our smart solution.
                </p>

                {/* Animated Buttons with Hover Shine */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-8 flex justify-center space-x-6"
                >
                    <Link
                        to="/login"
                        className="relative bg-gradient-to-r from-green-400 to-green-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-lg transform hover:scale-105"
                    >
                        Get Started 🚀
                        <span className="absolute inset-0 rounded-lg bg-white opacity-10 hover:opacity-20 transition"></span>
                    </Link>

                    <Link
                        to="/about"
                        className="relative bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition shadow-lg transform hover:scale-105"
                    >
                        Learn More 🔥
                        <span className="absolute inset-0 rounded-lg bg-white opacity-10 hover:opacity-20 transition"></span>
                    </Link>

                    <Link
                        to="/annoucement-list"
                        className="relative bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition shadow-lg transform hover:scale-105"
                    >
                       Announcement🔥
                        <span className="absolute inset-0 rounded-lg bg-white opacity-10 hover:opacity-20 transition"></span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Home;