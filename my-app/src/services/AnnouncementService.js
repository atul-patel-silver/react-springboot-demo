
import axios from "axios";
import HandleApiResponse from "../components/handleApiResponse";
axios.defaults.withCredentials = true;

export const addAnnouncement = async (data,navigate) => {
    try{
        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('visible', data.visibility == "public" ? true : false);
        formData.append('expiryDate', data.expiryDate);
        formData.append('content', data.value);        
     const res= await axios.post("http://localhost:8080/announcement/add",formData,{
        headers: { "Content-Type": "application/json" },
      });
     return res.data;
    }catch(error){
        HandleApiResponse(error,navigate); 
        throw error;
    }
  
};