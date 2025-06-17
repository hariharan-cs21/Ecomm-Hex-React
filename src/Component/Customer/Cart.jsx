import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../store/actions/CartActions';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const clearCart = async () => {
        try {
            await axios.delete("http://localhost:8080/api/cart/clear", {
                headers: { "Authorization": "Bearer " + token }
            });
            setMsg("Cart Cleared");
            setCart(dispatch)(token);
        } catch (error) {
            setMsg("Cannot clear cart");
        }
    };

    const getTotal = () => {
        return cartItems.reduce((sum, item) => {
            return sum + item.quantity * item.sellerProduct.price;
        }, 0);
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-3">My Cart</h4>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Total: ₹{getTotal()}</h5>
                <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
            </div>

            {msg && <div className="alert alert-info">{msg}</div>}
            <hr />
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row mt-2">
                    {cartItems.map((item) => {
                        const { sellerProduct, quantity } = item;
                        const product = sellerProduct.product;

                        return (
                            <div className="col-md-6 mb-4" key={item.id}>
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="row g-0">
                                        <div className="col-4">
                                            <img
                                                src={product.imageUrl}
                                                className="img-fluid rounded-start"
                                                alt={product.productName}
                                                style={{ objectFit: 'cover', height: '100%' }}
                                            />
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body p-2">
                                                <h6 className="mb-1">{product.productName}</h6>
                                                <p className="text-muted mb-1 small">{product.brandName}</p>
                                                <p className="mb-1 small"><strong>Seller:</strong> {sellerProduct.seller.name}</p>
                                                <p className="mb-1 small"><strong>Price:</strong> ₹{sellerProduct.price}</p>
                                                <p className="mb-1 small"><strong>Quantity:</strong> {quantity}</p>
                                                <p className="mb-0 small"><strong>Subtotal:</strong> ₹{quantity * sellerProduct.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Cart;
