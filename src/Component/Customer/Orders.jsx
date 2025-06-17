import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/order/history', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                setOrders(response.data);
            } catch (err) {
                console.log('Failed to fetch orders');
                navigate("/")
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container my-4">
            <h2 className="mb-4 fw-semibold">Order History</h2>
            {orders.length === 0 ? (
                <div className="alert alert-info text-center">No orders found.</div>
            ) : (
                orders.map((order) => (
                    <div key={order.orderId} className="card mb-3 shadow-sm border-0">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="card-title mb-0">Order # {order.orderId}</h5>
                                <span className={`badge ${order.status === 'DELIVERED' ? 'bg-success' :
                                    order.status === 'CANCELLED' ? 'bg-danger' :
                                        order.status === 'PENDING' ? 'bg-warning text-dark' :
                                            'bg-secondary'
                                    }`}>
                                    {order.status}
                                </span>

                            </div>
                            <p className="text-muted small mb-2">
                                {order.orderDate}
                            </p>
                            <p className="mb-2">
                                <strong>Shipping:</strong> {order.street}, {order.shippingCity}<br />
                                <strong>Contact:</strong> {order.contact}<br />
                                <strong>Total Price:</strong> ₹{order.totalPrice.toLocaleString()}
                            </p>
                            <h6 className="fw-semibold mt-3">Items:</h6>
                            <ul className="list-group list-group-flush">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <div>
                                            #{item.itemId} {item.productName} <span className="text-muted">({item.itemStatus === "APPROVED" ? "Item ready for shippment" : item.itemStatus})</span>
                                        </div>
                                        <div>
                                            {item.quantity} x ₹{item.price.toLocaleString()}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
