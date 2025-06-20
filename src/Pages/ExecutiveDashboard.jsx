import { Outlet } from "react-router-dom"
import Navbar from "../Component/Executive/Navbar"


const ExecutiveDashboard = () => {
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