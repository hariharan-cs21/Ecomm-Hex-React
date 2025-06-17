import { useState, useEffect } from 'react';
// import axios from 'axios';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../store/actions/CartActions';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");

    const clearCart = async () => {
        try {
            await axios.delete("http://localhost:8080/api/cart/clear", {
                headers: { "Authorization": "Bearer " + token }
            })
            setMsg("Cart Cleared")
            setCart(dispatch)(token)
        } catch (error) {
            setMsg(error.response.data.message || "Cannot clear")
        }
    }

    const getTotal = () => {
        return cartItems.reduce((sum, item) => {
            return sum + item.quantity * item.sellerProduct.price;
        }, 0);
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-3">Your Cart</h4>

            {msg && <div className="alert alert-danger">{msg}</div>}

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="row g-3">
                        <div className='row'>
                            <div className='col-8'></div>
                            <div className='col-4'>
                                <button className="btn btn-danger mt-3" onClick={clearCart}>
                                    Clear All
                                </button>
                            </div>
                        </div>

                        {cartItems.map((item) => {
                            const { sellerProduct, quantity } = item;
                            const product = sellerProduct.product;

                            return (
                                <div className="col-md-6" key={item.id}>
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img
                                                    src={product.imageUrl}
                                                    className="img-fluid rounded-start h-100"
                                                    alt={product.productName}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body p-3 d-flex flex-column h-100">
                                                    <h6 className="card-title mb-1">{product.productName}</h6>
                                                    <p className="text-muted mb-1 small">{product.brandName}</p>
                                                    <p className="mb-1"><strong>Seller:</strong> {sellerProduct.seller.name}</p>
                                                    <p className="mb-1"><strong>Price:</strong> ₹{sellerProduct.price}</p>
                                                    <p className="mb-1"><strong>Quantity:</strong> {quantity}</p>
                                                    <p className="mb-0"><strong>Subtotal:</strong> ₹{quantity * sellerProduct.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <hr />
                    <h5>Total: ₹{getTotal()}</h5>
                </>
            )}
        </div>
    );
};

export default Cart;
