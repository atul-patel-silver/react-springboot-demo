import axios from "axios";
import HandleApiResponse from "../components/handleApiResponse";
axios.defaults.withCredentials = true;
export const dashboard = async (navigate) => {
    try{
        const response =await axios.get("http://localhost:8080/user/dashboard");
         return response.data;
    }catch(error){
        HandleApiResponse(error,navigate); // No field errors, so no second parameter
        throw error;
    }
  
};

