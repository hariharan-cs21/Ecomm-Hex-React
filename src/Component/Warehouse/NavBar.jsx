import { useNavigate, Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../store/actions/UserActions";

const Navbar = () => {
    const name = localStorage.getItem("name");
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        let user = {
            "username": "",
            "role": ""
        }
        setUserDetails(dispatch)(user);
    };



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Ecommerce</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link to="/warehouse/shipped-orders" className="nav-link" >Shipped Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/warehouse/deliver-orders" className="nav-link" >Delivery Service</Link>
                        </li>



                    </ul>



                    <ul className="navbar-nav ">

                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                style={{ cursor: "pointer" }}
                            >
                                <RxAvatar size={24} />
                                {user.username || name}
                            </span>

                            <ul className="dropdown-menu dropdown-menu-end" style={{ cursor: "pointer" }}>
                                <li>
                                    <span className="dropdown-item" onClick={handleLogout}>Logout</span>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
