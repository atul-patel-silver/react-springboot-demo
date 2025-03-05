import { toast } from "react-toastify";

const HandleApiResponse = (error, router, setErrors = null) => {
  console.log(error);

  if (error?.response) {
    const { status, data } = error.response;
    console.log(status)
    switch (status) {
      case 400:
        toast.error(data.message || "❌ Bad Request! Please check your input.", {
          style: { background: "#ff4d4d", color: "#fff", width: "400px" },
          icon: "❌",
          autoClose: 3000,
        });
        break;

      case 401:
        toast.warning("🔒 Unauthorized! Please log in again.", {
          style: { background: "#ffcc00", color: "#000", width: "400px" },
          icon: "🔒",
          autoClose: 3000,
        });
        setTimeout(() => {
          router("/login");
        }, 2000);

        break;

      case 403:
        toast.warning("⚠️ Access Denied! You don’t have permission.", {
          style: { background: "#ffa500", color: "#000", width: "400px" },
          icon: "⚠️",
          autoClose: 4000,
        });
        break;

      case 404:
        toast.error(data.errorMessage || "🔍 Resource not found.", {
          style: { background: "#ff4d4d", color: "#fff", width: "400px" },
          icon: "🔍",
          autoClose: 3000,
        });
        break;

      case 422:
        if (setErrors && data) {
          setErrors(data);
        } else {
          toast.warning("⚠️ Validation failed! Please check your inputs.", {
            style: { background: "#ffcc00", color: "#000", width: "400px" },
            icon: "⚠️",
            autoClose: 3000,
          });
        }
        break;

      case 500:
        toast.error(data.errorMessage || "💥 Server error! Please try again later.", {
          style: { background: "#ff0000", color: "#fff", width: "400px" },
          icon: "💥",
          autoClose: 3000,
        });
        break;

      default:
        toast.error(data.errorMessage || "❗ Unexpected error occurred. Please try again.", {
          style: { background: "#ff4d4d", color: "#fff", width: "400px" },
          icon: "❗",
          autoClose: 3000,
        });
    }
  } else {
    // Handle Network Error
    toast.error("🚨 Network error! Please check your connection and try again.", {
      style: { background: "#d9534f", color: "#fff", width: "400px" },
      icon: "🚨",
      autoClose: 3000,
    });
  }
};

export default HandleApiResponse;
