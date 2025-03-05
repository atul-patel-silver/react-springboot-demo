import axios from "axios";
import HandleApiResponse from "./handleApiResponse";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAnnouncementList");
        setAnnouncements(response.data);
      } catch (error) {
        HandleApiResponse(error, navigate);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📢 Announcements
      </motion.h2>

      {/* Grid Layout with Simple Animation */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {announcements.map((card) => (
          <motion.div
            key={card.id}
            className="bg-gray-800 p-6 rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h3 className="text-xl font-semibold text-blue-400">{card.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{card.expiryDate} • {card.visibility}</p>

            {/* View Details Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`/announcement/${card.id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
              >
                View Details
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
