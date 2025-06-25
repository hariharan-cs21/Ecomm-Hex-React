import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewProductRequest = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchPendingRequests = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/executive/requests/pending", config);
            setPendingRequests(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            await axios.put(`http://localhost:8080/api/executive/requests/approve/${requestId}`, null, config);
            setMessage("Product approved successfully.");
            fetchPendingRequests();
        } catch (error) {
            setMessage("Failed to approve product");
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    return (
        <div className="container my-4">
            <h4>Pending Product Requests</h4>
            {message && <div className="alert alert-info py-1">{message}</div>}
            <div className="row">
                {pendingRequests.length === 0 ? (
                    <p>No pending product requests found</p>
                ) : (
                    pendingRequests.map((req) => (
                        <div key={req.id} className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{req.brandName} - {req.productName}</h5>
                                    <p className="card-text">
                                        <strong>Category:</strong> {req.category?.categoryName}<br />
                                        <strong>Seller:</strong> {req.seller?.name}
                                    </p>

                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleApprove(req.id)}
                                    >
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NewProductRequest;
