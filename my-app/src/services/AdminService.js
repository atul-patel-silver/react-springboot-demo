import axios from "axios";
import HandleApiResponse from "../components/handleApiResponse";
axios.defaults.withCredentials = true;

export const dashboard = async (navigate) => {
    try{
     const res= await axios.get("http://localhost:8080/admin/dashboard");
     return res.data;
    }catch(error){
        HandleApiResponse(error,navigate); 
        throw error;
    }
  
};



export const signup = async (userData,setErrors,navigate) => {
    debugger
    try {
        await axios.post("http://localhost:8080/admin/registeruser", userData);
    } catch (error) {
        HandleApiResponse(error,navigate,setErrors); // No field errors, so no second parameter
        throw error;
    }
};



export const getAllUser = async (navigate) => {
    try {
       const response = await axios.get("http://localhost:8080/admin/getUserList");
       return response.data; // ✅ Extract only the data
    } catch (error) {

        // console.log(error)
        HandleApiResponse(error,navigate);
        throw error;
    }
};