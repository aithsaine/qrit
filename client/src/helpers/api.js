import axios from "axios"

const api  = axios.create({
    withCredentials:true,
    
    baseURL:process.env.REACT_APP_BACKEND_URI,
    headers:{
        Authorization:localStorage.getItem("auth_token")?`Bearer ${localStorage.getItem("auth_token")}`:""
    }
})

export const csrf = async () => await api.get("sanctum/csrf-cookie");
export default api