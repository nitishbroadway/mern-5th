import axios from "axios"
import { fromStorage } from "../lib"
import { toast } from "react-toastify"

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

http.interceptors.request.use(config => {
    const token = fromStorage('mern5thtoken')

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, error => Promise.reject(error))

http.interceptors.response.use(resp => {
    if(resp?.data?.message) {
        toast.success(resp?.data?.message)
    }

    return resp
}, error => {
    if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
    }

    return Promise.reject(error)
})

export default http