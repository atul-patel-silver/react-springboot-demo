import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export const AnnouncementDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getAnnouncement?id=${id}`);
        setAnnouncement(response.data);
      } catch (error) {
        console.error("Error fetching announcement details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!announcement)
    return (
      <motion.p
        className="text-white text-center text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Loading...
      </motion.p>
    );

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl font-bold text-blue-400"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {announcement.title}
        </motion.h2>

        <motion.p
          className="text-gray-400 mt-1"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {announcement.expiryDate} • {announcement.visibility}
        </motion.p>

        <motion.div
          className="mt-4 p-4 bg-gray-700 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
        </motion.div>
      </motion.div>

      {/* Back Button with Motion */}
      <motion.button
        onClick={() => navigate(-1)}
        className="mt-6 px-5 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ⬅ Back to List
      </motion.button>
    </motion.div>
  );
};
