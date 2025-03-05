import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../services/AdminService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaSave, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "./Loader";

const UserList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedFName, setEditedFName] = useState("");
    const [editedSName, setEditedSName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 2; // Number of users per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getAllUser(navigate);
                setUsers(response);
            } catch (error) {
                toast.error("Failed to load users!");
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleDelete = (id) => {
        setIsLoading(true);
        setUsers(users.filter((user) => user.id !== id));
        toast.success("User deleted successfully!");
        setIsLoading(false);
    };

    const handleEdit = (user) => {
        setEditingUser(user.id);
        setEditedSName(user.lastName);
        setEditedFName(user.firstName);
        setEditedEmail(user.emailId);
    };

    const handleSave = (id) => {
        setIsLoading(true);
        setUsers(
            users.map((user) =>
                user.id === id ? { ...user, firstName: editedFName, lastName: editedSName, emailId: editedEmail } : user
            )
        );
        setEditingUser(null);
        toast.success("User updated successfully!");
        setIsLoading(false);
    };

    // Filtering users based on search query
    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.emailId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] px-6 py-10 relative overflow-hidden">
            {isLoading && <Loader />}
            
            <div className="absolute w-96 h-96 bg-purple-600 opacity-40 blur-[150px] rounded-full top-10 left-1/4 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-blue-500 opacity-50 blur-[150px] rounded-full bottom-20 right-1/4 animate-pulse"></div>

            <div className="relative bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-5xl text-center border border-white/20">
                <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-[0_0_15px_#3b82f6]">
                    🚀 User Management
                </h1>

                {/* Search Bar */}
                <div className="mb-6 flex items-center justify-center space-x-4">
                    <div className="relative w-2/3">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-3 pl-12 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-white/30 bg-white/10 shadow-lg rounded-2xl overflow-hidden text-white">
                        <thead>
                            <tr className="bg-gradient-to-r from-[#6a11cb] via-[#2575fc] to-[#00c6ff] text-white text-lg shadow-lg">
                                <th className="border p-4">First Name</th>
                                <th className="border p-4">Last Name</th>
                                <th className="border p-4">Email</th>
                                <th className="border p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <tr key={user.id} className="border border-white/20 hover:bg-white/20 transition duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer">
                                        <td className="border p-4 text-center text-lg">
                                            {editingUser === user.id ? (
                                                <input type="text" value={editedFName} onChange={(e) => setEditedFName(e.target.value)} className="border p-2 w-full rounded-lg bg-white/20 text-black" />
                                            ) : (
                                                user.firstName
                                            )}
                                        </td>
                                        <td className="border p-4 text-center text-lg">
                                            {editingUser === user.id ? (
                                                <input type="text" value={editedSName} onChange={(e) => setEditedSName(e.target.value)} className="border p-2 w-full rounded-lg bg-white/20 text-black" />
                                            ) : (
                                                user.lastName
                                            )}
                                        </td>
                                        <td className="border p-4 text-center text-lg">
                                            {editingUser === user.id ? (
                                                <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} className="border p-2 w-full rounded-lg bg-white/20 text-black" />
                                            ) : (
                                                user.emailId
                                            )}
                                        </td>
                                        <td className="p-4 flex justify-center space-x-3">
                                            {editingUser === user.id ? (
                                                <button onClick={() => handleSave(user.id)} className="px-5 py-2 rounded-xl bg-green-500 text-white"><FaSave /> Save</button>
                                            ) : (
                                                <button onClick={() => handleEdit(user)} className="px-5 py-2 rounded-xl bg-blue-500 text-white"><FaEdit /> Edit</button>
                                            )}
                                            <button onClick={() => handleDelete(user.id)} className="px-5 py-2 rounded-xl bg-red-500 text-white"><FaTrash /> Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="text-center p-6 text-lg">No users found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-6 space-x-3">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={`px-4 py-2 rounded-lg text-white ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800"}`}
                        disabled={currentPage === 1}
                    >
                        <FaChevronLeft />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 rounded-lg text-white ${currentPage === index + 1 ? "bg-blue-800" : "bg-blue-600 hover:bg-blue-800"}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={`px-4 py-2 rounded-lg text-white ${currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800"}`}
                        disabled={currentPage === totalPages}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default UserList;
