import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const AdminRoute = ({element}) => {
    const user = useSelector(state => state.user.value)

    const navigate = useNavigate()

    useEffect(() => {
        if(user.role != 'Admin') {
            navigate('/cms')
        }
    }, [user])
    
    return element
}