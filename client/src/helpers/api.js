import axios from "axios"

const api  = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URI,
})

export const csrf  = async()=>await api.get("sanctum/csrf-cookie")

export default api