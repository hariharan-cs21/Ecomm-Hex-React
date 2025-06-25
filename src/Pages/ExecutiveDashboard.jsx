import { Outlet } from "react-router-dom"
import Navbar from "../Component/Executive/Navbar"
import { useDispatch } from "react-redux"
import { setProductsDetails } from "../store/actions/ProductActions"
import { useEffect } from "react"

const ExecutiveDashboard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        setProductsDetails(dispatch)
    }, [])

    return (
        <div>
            <Navbar />
            <div className='container '>
                {<Outlet />}
            </div>
        </div>
    )
}

export default ExecutiveDashboard