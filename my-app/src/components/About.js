import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-6">
            {/* Background Light Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-16 w-24 h-24 bg-purple-500 opacity-40 blur-[100px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-500 opacity-40 blur-[120px] rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-green-500 opacity-30 blur-[100px] rounded-full animate-bounce"></div>
            </div>

            {/* Page Heading */}
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-6xl font-extrabold text-center tracking-wide drop-shadow-lg"
            >
                About <span className="text-blue-400 drop-shadow-[0_0_15px_#3b82f6]">MyApp</span> 💡
            </motion.h1>

            {/* Information Card */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative mt-10 max-w-4xl bg-white/10 backdrop-blur-xl shadow-xl p-10 rounded-3xl border border-white/20 text-center"
            >
                {/* Neon Border Effect */}
                <div className="absolute inset-0 border-2 border-indigo-500 opacity-20 rounded-3xl animate-pulse"></div>

                <p className="text-lg text-white/80 leading-relaxed">
                    MyApp is designed to **simplify your life** by providing smart, intuitive solutions for managing tasks, expenses, and conversations. 
                    Our goal is to create an **AI-powered assistant** that seamlessly integrates into your daily routine.
                </p>

                {/* Fun Facts / Counter Section */}
                <div className="mt-6 flex justify-around items-center space-x-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-4xl font-bold text-green-400">10K+</p>
                        <p className="text-sm text-white/70">Active Users</p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-4xl font-bold text-blue-400">100+</p>
                        <p className="text-sm text-white/70">Smart Features</p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-4xl font-bold text-purple-400">5+</p>
                        <p className="text-sm text-white/70">Years of Innovation</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-16 max-w-5xl text-center"
            >
                <h2 className="text-4xl font-semibold text-white drop-shadow-lg">Meet Our Team 👥</h2>
                <div className="mt-6 flex flex-wrap justify-center gap-6">
                    {/* Team Member Cards */}
                    {[
                        { name: "Kartik RamChadani", role: "CEO", color: "bg-blue-500" },
                        { name: "Krishnkant Bhau", role: "CTO", color: "bg-purple-500" },
                        { name: "Apurva Bhatt", role: "Lead Developer", color: "bg-green-500" },
                    ].map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                            className={`w-48 h-48 rounded-2xl p-6 shadow-xl ${member.color} text-white flex flex-col justify-center items-center`}
                        >
                            <h3 className="text-2xl font-bold">{member.name}</h3>
                            <p className="text-md text-white/80">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default About;
