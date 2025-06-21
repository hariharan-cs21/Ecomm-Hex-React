import { useEffect, useState } from 'react';
import axios from 'axios';

const CustomersOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("PENDING");
    const [stockMap, setStockMap] = useState({});
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchSellerOrders();
    }, [statusFilter]);

    useEffect(() => {
        filterOrders();
    }, [allOrders, startDate, endDate]);

    const fetchSellerOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/seller/orders/get', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                params: {
                    status: statusFilter || undefined
                }
            });
            setAllOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch seller orders:", error);
        }
    };

    const filterOrders = () => {
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const filtered = allOrders.filter(order => {
            const orderDate = new Date(order.orderDateTime);
            const afterStart = start ? orderDate >= start : true;
            const beforeEnd = end ? orderDate <= end : true;
            return afterStart && beforeEnd;
        });

        setOrders(filtered);
    };

    const handleAction = async (orderItemId, status) => {
        try {
            await axios.put(`http://localhost:8080/api/seller/orders/update-status/${orderItemId}`, null, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                params: { status }
            });
            fetchSellerOrders();
        } catch (error) {
            console.error(`Failed to update status to ${status}:`, error);
        }
    };

    const checkStock = async (sellerProductId, orderItemId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/seller-product/getStock/${sellerProductId}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setStockMap(prev => ({ ...prev, [orderItemId]: response.data.stock }));
        } catch (error) {
            console.error("Failed to fetch stock:", error);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Customer Orders</h3>

            <div className="row mb-4">
                <div className="col-md-3">
                    <label className="form-label fw-bold">Status</label>
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DISPATCHED">Dispatched</option>
                        <option value="DELIVERED">Delivered</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <label className="form-label fw-bold">Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label fw-bold">End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="alert alert-info">No orders found.</div>
            ) : (
                orders.map((order, idx) => (
                    <div key={idx} className="card mb-4 shadow-sm">
                        <div className="card-header bg-light d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{order.customerName}</h5>
                                <small className="text-muted">{order.street}, {order.city}</small>
                            </div>
                            <div className="text-end">
                                <div className="fw-bold">Order Date</div>
                                <div>{formatDate(order.orderDateTime)}</div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush">
                                {order.products.map((product, pidx) => (
                                    <li key={pidx} className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <div className="fw-semibold mb-1">
                                                    {product.productName} ({product.brandName}) - {product.category}
                                                </div>
                                                <div className="text-muted mb-1">
                                                    <strong>Order item ID:</strong> #{product.orderItemId}
                                                </div>
                                                <div className="mb-1">
                                                    <strong>Qty:</strong> {product.quantity} × ₹{product.price.toLocaleString()}
                                                </div>
                                                <span className={`badge bg-${getStatusColor(product.itemStatus)}`}>
                                                    {product.itemStatus}
                                                </span>
                                            </div>

                                            <div className="text-end ms-3" style={{ minWidth: '130px' }}>
                                                {product.itemStatus === "PENDING" && (
                                                    <button
                                                        className="btn btn-sm btn-success mb-2 w-100"
                                                        onClick={() => handleAction(product.orderItemId, "APPROVED")}
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {product.itemStatus === "APPROVED" && (
                                                    <button
                                                        className="btn btn-sm btn-primary mb-2 w-100"
                                                        onClick={() => handleAction(product.orderItemId, "SHIPPED")}
                                                    >
                                                        Ship
                                                    </button>
                                                )}
                                                <button
                                                    className="btn btn-sm btn-outline-secondary w-100"
                                                    onClick={() => checkStock(product.sellerProductId, product.orderItemId)}
                                                >
                                                    Check Stock
                                                </button>
                                                {stockMap[product.orderItemId] !== undefined && (
                                                    <div className="mt-2">
                                                        <span className="badge bg-info text-dark">
                                                            Stock: {stockMap[product.orderItemId]}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
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

const getStatusColor = (status) => {
    switch (status) {
        case "PENDING": return "warning";
        case "APPROVED": return "info";
        case "SHIPPED": return "primary";
        case "DISPATCHED": return "secondary";
        case "DELIVERED": return "success";
        default: return "dark";
    }
};

export default CustomersOrders;
