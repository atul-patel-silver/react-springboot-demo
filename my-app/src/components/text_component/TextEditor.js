import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addAnnouncement } from "../../services/AnnouncementService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const TextEditor = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submittedText, setSubmittedText] = useState(null);
    const navigate = useNavigate();

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const handleSubmit = () => {
        setSubmittedText({ title, value, expiryDate, visibility });
        setIsModalOpen(true); // Open modal
    };

    const handleConfirmData = async () => {
        // setSubmittedText({ title, value, expiryDate, visibility });
        setIsModalOpen(false); // Open modal
        setTitle("");
        setValue("");
        setExpiryDate("");
        setVisibility("public");

        try {
            const response = await addAnnouncement(submittedText, navigate);
            console.log(response);
            toast.success("✅ Announcement added successfully!", {
                style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px",
                    width: "380px",
                }
            });
        } catch (error) {
            console.log(error
            );
        }

    };


    return (
        <div className="flex min-h-screen bg-gray-900 text-white p-8 space-x-6">
            {/* Left Sidebar */}
            <div className="w-1/3 p-6 bg-gray-800 rounded-xl shadow-md space-y-6">
                <h2 className="text-xl font-bold text-blue-400">📢 Announcement Settings</h2>

                {/* Title Input */}
                <div>
                    <label className="block text-gray-300 font-semibold">Title</label>
                    <input
                        type="text"
                        className="w-full p-3 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter announcement title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Expiry Date */}
                <div>
                    <label className="block text-gray-300 font-semibold">Expiry Date</label>
                    <input
                        type="date"
                        className="w-full p-3 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>

                {/* Visibility Toggle */}
                <div className="flex justify-between items-center">
                    <label className="block text-gray-300 font-semibold">Visibility</label>
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition ${visibility === "public" ? "bg-green-500" : "bg-red-500"
                            }`}
                        onClick={() => setVisibility(visibility === "public" ? "private" : "public")}
                    >
                        {visibility === "public" ? "Public" : "Private"}
                    </button>
                </div>
            </div>

            {/* Right Section (Editor) */}
            <div className="w-2/3 bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-blue-400">✍️ Content</h2>

                {/* Styled Quill Editor */}
                <div className="h-72 border border-gray-600 rounded-lg overflow-hidden mt-3">
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        className="h-full custom-quill"
                    />
                </div>
            </div>
            {/* Bottom Section */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg animate-bounce"
                >
                    Verify & Submit 🚀
                </button>
            </div>

            {/* Modal Preview */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center animate-fade-in">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full relative border border-blue-500">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-lg"
                        >
                            ✖
                        </button>
                        <h3 className="text-2xl font-bold text-blue-400">{submittedText.title}</h3>
                        <p className="text-sm text-gray-500">📅 Expiry Date: {submittedText.expiryDate}</p>
                        <p
                            className={`text-sm font-semibold ${submittedText.visibility === "public" ? "text-green-400" : "text-red-400"
                                }`}
                        >
                            🔒 Visibility: {submittedText.visibility.charAt(0).toUpperCase() + submittedText.visibility.slice(1)}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: submittedText.value }} className="prose max-w-none mt-4 text-gray-300" />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                            >
                                Close
                            </button>
                            <button
                                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                onClick={() => handleConfirmData()}
                            >
                                Confirm ✅
                            </button>
                        </div>
                    </div>
                </div>
            )}

<ToastContainer position="top-center" autoClose={3000} />

        </div>
    );
};

export default TextEditor;
