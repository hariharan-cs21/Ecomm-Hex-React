import { Outlet } from "react-router-dom"
import NavBar from "../Component/Warehouse/NavBar"

const WareHouseDashboard = () => {
    return (
        <>
            <NavBar />
            <div className='container '>
                {<Outlet />}
            </div>
        </>
    )
}

export default WareHouseDashboard