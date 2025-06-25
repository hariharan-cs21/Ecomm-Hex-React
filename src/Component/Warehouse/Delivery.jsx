import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTruck } from 'react-icons/fa';

const Delivery = () => {
    const [dispatchedList, setDispatchedList] = useState([]);
    const [msg, setMsg] = useState("")


    const fetchDispatched = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8080/api/warehouse/dispatched', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDispatchedList(res.data);
        } catch (err) {
            console.error('Failed to fetch dispatched orders');
        }
    };

    const handleDeliver = async (itemId, item) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:8080/api/warehouse/deliver',
                [itemId],
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            setMsg(item.productName + " delivered to " + item.customerName)
            fetchDispatched();
        } catch (err) {
            console.error('Something went wrong');
        }
    };
    useEffect(() => {
        fetchDispatched();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="mb-4">Dispatched Orders</h2>
            {msg &&
                <div className="alert alert-info">
                    {msg}
                </div>
            }
            {dispatchedList.length === 0 ? (
                <div className="alert alert-warning">
                    No dispatched orders available.
                </div>
            ) : (
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Item ID</th>
                            <th>Product</th>
                            <th>Customer</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>Qty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dispatchedList.map((item, idx) => (
                            <tr key={item.orderItemId}>
                                <td>{idx + 1}</td>
                                <td>{item.orderId}</td>
                                <td>{item.orderItemId}</td>
                                <td>{item.productName}</td>
                                <td>{item.customerName}</td>
                                <td>{item.contact}</td>
                                <td>{`${item.street}, ${item.city}`}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-success btn-sm d-flex align-items-center"
                                        onClick={() => handleDeliver(item.orderItemId, item)}
                                    >
                                        <FaTruck style={{ marginRight: '6px' }} />
                                        Deliver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Delivery;
