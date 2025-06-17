import { useNavigate, Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";

const Navbar = () => {
    const name = localStorage.getItem("name");
    const navigate = useNavigate();
    const cartsize = useSelector(state => state.cart.cartSize)

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };
    const handleCart = () => {
        navigate("/customer/cart")
    }


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
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/customer">Products</Link>
                        </li>



                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">Orders</Link>
                        </li>
                    </ul>

                    <form className="d-flex me-3" role="search" onSubmit={(e) => e.preventDefault()}>
                        <input className="form-control me-2" type="search" placeholder="Search products" />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>

                    <ul className="navbar-nav ">
                        <li className="nav-item" onClick={handleCart}>
                            <Link className="nav-link" to="/cart">
                                <IoMdCart size={24} />
                                {cartsize}

                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" style={{ cursor: "pointer" }}>
                                <RxAvatar size={24} />
                                {name}
                            </span>
                            <ul className="dropdown-menu dropdown-menu-end" style={{ cursor: "pointer" }}>
                                <li className="dropdown-item" onClick={handleLogout}>Logout</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
