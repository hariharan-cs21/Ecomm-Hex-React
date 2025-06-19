import { Outlet } from "react-router-dom"
import Navbar from "../Component/Seller/NavBar"

const SellerDashboard = () => {
    return (
        <div>
            <Navbar />
            <div className='container '>
                {<Outlet />}
            </div>
        </div>
    )
}

export default SellerDashboard