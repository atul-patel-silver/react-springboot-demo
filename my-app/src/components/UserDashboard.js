import React, { useEffect, useState } from "react";
import { dashboard } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dashboard(navigate);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // Sample Order History Data
    const orderHistory = Array.from({ length: 100 }, (_, i) => ({
        id: 101 + i,
        date: `2024-02-${String((i % 28) + 1).padStart(2, "0")}`,
        item: ["Laptop", "Phone", "Headphones", "Monitor", "Keyboard", "Mouse", "Tablet", "Smartwatch", "Charger", "Speaker"][i % 10],
        amount: Math.floor(Math.random() * 2000) + 10,
    }));

    const [searchQuery, setSearchQuery] = useState("");
    const [filterDate, setFilterDate] = useState("");

    // Filter Orders Based on Date and Search Query
    const filteredOrders = orderHistory.filter(order =>
        (!filterDate || order.date === filterDate) &&
        order.item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const salesData = [
        { month: "Jan", sales: 5000 },
        { month: "Feb", sales: 7000 },
        { month: "Mar", sales: 9000 },
        { month: "Apr", sales: 8500 },
        { month: "May", sales: 11000 },
    ];

    const revenueData = [
        { month: "Jan", revenue: 8000 },
        { month: "Feb", revenue: 9500 },
        { month: "Mar", revenue: 12000 },
        { month: "Apr", revenue: 15000 },
        { month: "May", revenue: 17000 },
    ];

    const productData = [
        { name: "Electronics", value: 40 },
        { name: "Fashion", value: 25 },
        { name: "Home Appliances", value: 20 },
        { name: "Books", value: 10 },
        { name: "Others", value: 5 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
        {/* Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-700 to-indigo-900 blur-3xl opacity-30"></div>
    
        {/* User Dashboard Card */}
        <div className="relative bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-6xl text-center border border-white/20">
            <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">👤 User Dashboard</h1>
    
            {userData ? (
                <div className="bg-white/20 p-6 rounded-lg shadow-md border border-white/30 text-white">
                    <h2 className="text-3xl font-semibold">Welcome, {userData.firstName} {userData.lastName} 👋</h2>
                    <p className="text-lg mt-2 opacity-80">📧 Email: {userData.emailId}</p>
                    <p className="text-lg mt-1 opacity-80">🎖 UserName: {userData.userName}</p>
                </div>
            ) : (
                <p className="text-lg text-white opacity-80">Loading user data...</p>
            )}
    
            {/* Order History Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-6 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
            >
                📜 View Order History
            </button>
    
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                {/* Order History Chart */}
                <div className="bg-white/20 p-6 rounded-lg shadow-md border border-white/30">
                    <h2 className="text-2xl font-semibold text-white mb-4">📦 Order History</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={orderHistory}>
                            <XAxis dataKey="date" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />
                            <Area type="monotone" dataKey="amount" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
    
                {/* Sales Performance Chart */}
                <div className="bg-white/20 p-6 rounded-lg shadow-md border border-white/30">
                    <h2 className="text-2xl font-semibold text-white mb-4">📈 Sales Performance</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <XAxis dataKey="month" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#FF8042" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
    
                {/* Revenue Growth Chart */}
                <div className="bg-white/20 p-6 rounded-lg shadow-md border border-white/30">
                    <h2 className="text-2xl font-semibold text-white mb-4">💰 Revenue Growth</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <XAxis dataKey="month" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#00C49F" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
    
                {/* Product Category Distribution */}
                <div className="bg-white/20 p-6 rounded-lg shadow-md border border-white/30">
                    <h2 className="text-2xl font-semibold text-white mb-4">🏆 Product Categories</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={productData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                                {productData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    
        {/* Order History Modal */}
        {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300">
                    <div className="bg-gray-900 text-white rounded-2xl p-6 w-full max-w-3xl shadow-lg transform transition-transform duration-300">
                        <h2 className="text-3xl font-semibold text-center mb-4">📜 Order History</h2>

                        {/* Search & Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="🔍 Search by item..."
                                className="px-4 py-2 w-full sm:w-1/2 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none border border-gray-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <input
                                type="date"
                                className="px-4 py-2 w-full sm:w-1/2 rounded-lg bg-gray-800 text-white outline-none border border-gray-700"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                        </div>

                        {/* Scrollable Table */}
                        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                            <table className="w-full border-collapse border border-gray-700 text-white">
                                <thead>
                                    <tr className="bg-gray-800">
                                        <th className="p-3 border border-gray-700">Order ID</th>
                                        <th className="p-3 border border-gray-700">Date</th>
                                        <th className="p-3 border border-gray-700">Item</th>
                                        <th className="p-3 border border-gray-700">Amount ($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map(order => (
                                            <tr key={order.id} className="hover:bg-gray-800 transition-colors">
                                                <td className="p-3 border border-gray-700">{order.id}</td>
                                                <td className="p-3 border border-gray-700">{order.date}</td>
                                                <td className="p-3 border border-gray-700">{order.item}</td>
                                                <td className="p-3 border border-gray-700">${order.amount}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-4 text-center text-gray-400">No matching orders found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Close Button */}
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                ❌ Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
    
        <ToastContainer position="top-center" autoClose={3000} />
    </div>
    
    );
};

export default UserDashboard;
