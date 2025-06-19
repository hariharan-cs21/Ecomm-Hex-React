import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiMapPin, FiPhone, FiPackage, FiTruck, FiBox } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';

const statusFlow = ["PENDING", "ACCEPTED", "SHIPPED", "DISPATCHED", "DELIVERED"];

const renderProgress = (status) => {
    if (status === "CANCELLED") return null;
    const index = statusFlow.indexOf(status);
    if (index === -1) return null;
    const path = statusFlow.slice(0, index + 1);
    return path.join(" → ");
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [times, setTimes] = useState({});

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const getTimes = async (orderId) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/warehouse/dispatch-times/order/${orderId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            setTimes({
                ...times,
                [orderId]: res.data
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/order/history', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                setOrders(response.data);
                response.data.forEach(order => {
                    getTimes(order.orderId);
                });
            } catch (err) {
                console.log('Failed to fetch orders');
                navigate("/");
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container my-4">
            <h3 className="mb-4 fw-bold text-center">Order History</h3>
            {orders.length === 0 ? (
                <div className="alert alert-info text-center">No orders found.</div>
            ) : (
                orders.map((order) => (
                    <div key={order.orderId} className="card mb-3 shadow-sm border-0 rounded-3" style={{ fontSize: '0.9rem' }}>
                        <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="card-title mb-0">
                                    <FiPackage className="me-2" />
                                    Order #{order.orderId}
                                </h6>
                                <span className={`badge px-3 py-1 ${order.status === 'DELIVERED' ? 'bg-success' :
                                    order.status === 'CANCELLED' ? 'bg-danger' :
                                        order.status === 'PENDING' ? 'bg-warning text-dark' :
                                            'bg-secondary'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <p className="text-muted small mb-2">
                                <FiClock className="me-1" />
                                {new Date(order.orderDate).toLocaleString()}
                            </p>

                            {order.status !== "CANCELLED" && (
                                <p className="mb-2 text-primary">
                                    <FiTruck className="me-2" />
                                    <strong>Tracking:</strong> {renderProgress(order.status)}
                                </p>
                            )}

                            {times[order.orderId] && (
                                <div className="mb-2 text-muted">
                                    <div>
                                        <strong>Dispatched:</strong> {new Date(times[order.orderId].dispatchTime).toLocaleString()}
                                    </div>
                                    <div>
                                        <strong>Delivered:</strong> {new Date(times[order.orderId].deliveredTime).toLocaleString()}
                                    </div>
                                </div>
                            )}

                            <div className="mb-2">
                                <p className="mb-1">
                                    <FiMapPin className="me-2" />
                                    <strong>Shipping:</strong> {order.street}, {order.shippingCity}
                                </p>
                                <p className="mb-1">
                                    <FiPhone className="me-2" />
                                    <strong>Contact:</strong> {order.contact}
                                </p>
                                <p className="mb-0">
                                    <FaRupeeSign className="me-2" />
                                    <strong>Total Price:</strong> ₹{order.totalPrice.toLocaleString()}
                                </p>
                            </div>

                            <h6 className="fw-semibold mt-3"><FiBox className="me-2" />Items:</h6>
                            <ul className="list-group list-group-flush">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center px-0 py-1">
                                        <div>
                                            #{item.itemId} {item.productName}
                                            <span className="text-muted small ms-2">
                                                ({item.itemStatus === "APPROVED" ? "Item ready for shipment" : item.itemStatus})
                                            </span>
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
