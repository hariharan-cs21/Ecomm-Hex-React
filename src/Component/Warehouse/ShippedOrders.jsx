import axios from 'axios';
import { useEffect, useState } from 'react';

const ShippedOrders = () => {
    const [shippedList, setShippedList] = useState([]);

    const getShipped = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/warehouse/shipped', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            });
            setShippedList(res.data);
        } catch (error) {
            console.error('Error fetching shipped order');
        }
    };

    const groupOrdersById = () => {
        const grouped = {};

        for (let order of shippedList) {
            const id = order.orderId;
            if (!grouped[id]) {
                grouped[id] = [];
            }
            grouped[id].push(order);
        }

        const result = [];
        for (let id in grouped) {
            result.push({
                orderId: id,
                orders: grouped[id]
            });
        }

        return result;
    };

    const handleDispatch = async (orderId) => {
        try {
            await axios.post(
                `http://localhost:8080/api/warehouse/dispatch/${orderId}`,
                null,
                {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            getShipped();
        } catch (error) {
            console.error('Error dispatching order');
        }
    };

    useEffect(() => {
        getShipped();
    }, []);

    const groupedOrders = groupOrdersById();

    return (
        <div className="container my-5">
            <h1 className="mb-4">Shipped Orders</h1>
            {groupedOrders.length === 0 ? (
                <div className="alert alert-warning">
                    No shipped orders available.
                </div>
            ) : (
                groupedOrders.map((group) => (
                    <div key={group.orderId} className="card mb-4">
                        <div className="card-header">
                            <h5>Order ID: {group.orderId}</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {group.orders.map((order) => (
                                    <li key={order.orderItemId} className="list-group-item">
                                        <p><strong>Product:</strong> {order.productName}</p>
                                        <p><strong>Quantity:</strong> {order.quantity}</p>
                                        <p><strong>Customer:</strong> {order.customerName}</p>
                                        <p><strong>Contact:</strong> {order.contact}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-footer text-center">
                            <button
                                onClick={() => handleDispatch(group.orderId)}
                                className="btn btn-primary">
                                Dispatch Order #{group.orderId}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ShippedOrders;
