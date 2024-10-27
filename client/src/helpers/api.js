import axios from "axios"

const api  = axios.create({
    withCredentials:false,
    
    baseURL:process.env.REACT_APP_BACKEND_URI,
    headers:{
        Authorization:localStorage.getItem("auth_token")?`Bearer ${localStorage.getItem("auth_token")}`:"",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",

    }
})

export const csrf = async () => await api.get("sanctum/csrf-cookie");
export default api