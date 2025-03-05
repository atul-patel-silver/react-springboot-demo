import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { dashboard } from "../services/AdminService";
import "react-toastify/dist/ReactToastify.css";
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from "recharts";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await dashboard(navigate);
            setUserData(data);
        };
        fetchData();
    }, []);

    const productData = [
        { name: "Laptops", sales: 1200 },
        { name: "Smartphones", sales: 2000 },
        { name: "Tablets", sales: 900 },
        { name: "Headphones", sales: 1500 },
        { name: "Cameras", sales: 800 },
    ];

    const revenueData = [
        { month: "Jan", revenue: 4000 },
        { month: "Feb", revenue: 3000 },
        { month: "Mar", revenue: 5000 },
        { month: "Apr", revenue: 7000 },
        { month: "May", revenue: 6000 },
        { month: "Jun", revenue: 8000 },
    ];

    const categoryData = [
        { category: "Electronics", value: 40 },
        { category: "Fashion", value: 25 },
        { category: "Grocery", value: 20 },
        { category: "Home Appliances", value: 15 },
    ];
    
    const ordersData = [
        { month: "Jan", orders: 1200 },
        { month: "Feb", orders: 1500 },
        { month: "Mar", orders: 1800 },
        { month: "Apr", orders: 2000 },
        { month: "May", orders: 2500 },
        { month: "Jun", orders: 2800 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-80 h-80 bg-indigo-600 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl bottom-20 right-10 animate-pulse"></div>
            </div>

            {/* Dashboard Container */}
            <div className="relative bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-7xl text-center border border-white/20">
                <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">🚀 Admin Dashboard</h1>

                {userData ? (
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md text-white">
                        <h2 className="text-2xl font-semibold">Welcome, {userData.firstName} {userData.lastName} 👋</h2>
                        <p className="text-lg mt-2 opacity-80">📧 {userData.emailId}</p>
                        <p className="text-lg mt-1 opacity-80">🎖 {userData.userName}</p>
                    </div>
                ) : (
                    <p className="text-lg text-white opacity-80">Loading user data...</p>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-6">
                    <button 
                        onClick={() => navigate("/admin/userlist")}
                        className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        📜 Show User List
                    </button>
                    <button 
                        onClick={() => navigate("/admin/signup")}
                        className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        ➕ Add User
                    </button>

                    <button 
                        onClick={() => navigate("/admin/annoucement")}
                        className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        ➕ Add Announcement
                    </button>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    
                    {/* Bar Chart - Product Sales */}
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-white mb-4">📊 Product Sales</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={productData}>
                                <XAxis dataKey="name" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
                                <Bar dataKey="sales" fill="#4f46e5" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Line Chart - Revenue Growth */}
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-white mb-4">📈 Revenue Growth</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <XAxis dataKey="month" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#ffbb28" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart - Category Distribution */}
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-white mb-4">📉 Category Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={categoryData} dataKey="value" nameKey="category" outerRadius={100}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Area Chart - Monthly Orders */}
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-white mb-4">📦 Monthly Orders</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={ordersData}>
                                <XAxis dataKey="month" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip />
                                <Area type="monotone" dataKey="orders" stroke="#82ca9d" fill="#82ca9d" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};
export default AdminDashboard;
