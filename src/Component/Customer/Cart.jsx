import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../store/actions/CartActions';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const [msg, setMsg] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const fetchAddresses = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/address/list", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAddresses(res.data);
            if (res.data.length) setSelectedAddressId(res.data[0].id);
        } catch (err) {
            console.error("Error fetching addresses", err);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const clearCart = async () => {
        try {
            await axios.delete("http://localhost:8080/api/cart/clear", {
                headers: { Authorization: "Bearer " + token }
            });
            setMsg("Cart Cleared");
            setCart(dispatch)(token);
        } catch {
            setMsg("Cannot clear cart");
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            setMsg("Please select an address");
            return;
        }

        try {
            await axios.post(`http://localhost:8080/api/order/place/${selectedAddressId}`, null, {
                headers: { Authorization: "Bearer " + token }
            })
            setMsg("Order placed successfully!");
            setCart(dispatch)(token);
        } catch {
            setMsg("Failed to place order");
        }
    };

    const getTotal = () => cartItems.reduce((sum, item) =>
        sum + item.quantity * item.sellerProduct.price, 0);

    return (
        <div className="container mt-4">
            <h4 className="mb-3">My Cart</h4>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Total: ₹{getTotal()}</h5>
                <button className="btn btn-danger btn-sm" onClick={clearCart}>Clear Cart</button>
            </div>

            {msg && <div className="alert alert-info py-1">{msg}</div>}
            <hr />

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        {cartItems.map((item) => {
                            const { sellerProduct, quantity } = item;
                            const product = sellerProduct.product;

                            return (
                                <div className="card mb-2 shadow-sm border-0" key={item.id}>
                                    <div className="d-flex">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.productName}
                                            className="img-thumbnail"
                                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '8px', margin: '10px' }}
                                        />
                                        <div className="p-2 w-100">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="mb-1">{product.productName}</h6>
                                                <span className="text-muted small">₹{sellerProduct.price}</span>
                                            </div>
                                            <p className="small mb-1 text-muted">{product.brandName}</p>
                                            <p className="small mb-1">Qty: {quantity}</p>
                                            <p className="small mb-0"><strong>Subtotal:</strong> ₹{quantity * sellerProduct.price}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <h6 className="card-title">Order Summary</h6>
                                <p><strong>Items:</strong> {cartItems.length}</p>
                                <p><strong>Total:</strong> ₹{getTotal()}</p>
                                <hr />
                                <h6>Select Address</h6>
                                {addresses.length === 0 ? (
                                    <p className="text-muted small">No saved addresses</p>
                                ) : (
                                    <select
                                        className="form-select mb-3"
                                        value={selectedAddressId}
                                        onChange={(e) => setSelectedAddressId(e.target.value)}
                                    >
                                        {addresses.map(addr => (
                                            <option key={addr.id} value={addr.id}>
                                                {addr.street}, {addr.city}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <button className="btn btn-success w-100" onClick={handlePlaceOrder}>
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
