import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Component/Customer/Navbar'
import { Outlet } from "react-router-dom"
import { useEffect } from 'react'
import { setCart } from '../store/actions/CartActions'
const CustomerDashboard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem("token");
        setCart(dispatch)(token)
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

export default CustomerDashboard