import axios from "axios";
import HandleApiResponse from "../components/handleApiResponse";
import { setLoginStatus, logout, login_ } from "../redux/AuthSlice";

axios.defaults.withCredentials = true;
export const login = async (userName, password,setErrors,router,dispatch) => {
    try {
        const response = await axios.post("http://localhost:8080/login", {
            userName: userName,
            password: password
        },{ withCredentials: true });
        dispatch(login_(response.data.role));
        return response.data;
    } catch (error) {
    dispatch(logout());
    HandleApiResponse(error,router,setErrors); // No field errors, so no second parameter
    throw error;
    }
}



const API_BASE_URL = "http://localhost:8080"; 

export const checkLoginStatus = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/status`);

    console.log(response);
    dispatch(login_(response.data.roleName));
   // dispatch(setLoginStatus(true));
  } catch (error) {
    dispatch(logout());
  }
};

export const logoutUser = async (dispatch) => {
  try {
    const response=await axios.get("http://localhost:8080/signout");
    console.log(response);
    dispatch(logout());
  } catch (error) {
    console.error("Logout failed", error);
  }
};

