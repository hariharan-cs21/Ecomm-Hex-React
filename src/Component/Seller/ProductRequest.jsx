import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductRequests = () => {
    const [requests, setRequests] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        brandName: '',
        productName: '',
        categoryId: ''
    });
    const [msg, setMsg] = useState("");

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/seller-product/requests/seller', config);
            setRequests(res.data);
        } catch (error) {
            setMsg(error.response.data.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/category/getAll");
            setCategories(res.data);
        } catch (error) {
            setMsg(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchRequests();
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const { brandName, productName, categoryId } = form;
        if (!brandName || !productName || !categoryId) {
            setMsg("All fields are required.");
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/seller-product/request/${categoryId}`,
                { brandName, productName },
                config
            );
            setMsg("Product request submitted successfully.");
            setForm({ brandName: '', productName: '', categoryId: '' });
            fetchRequests();
        } catch (error) {
            setMsg(error.response.data.message);
        }
    };

    return (
        <div className="container my-4">
            <h4 className="mb-3">Request a New Product</h4>
            {msg && <div className="alert alert-info">{msg}</div>}

            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        name="brandName"
                        value={form.brandName}
                        onChange={handleChange}
                        placeholder="Brand Name"
                        className="form-control"
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        name="productName"
                        value={form.productName}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="form-control"
                    />
                </div>
                <div className="col-md-4">
                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-12 text-end">
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit Request</button>
                </div>
            </div>

            <h4 className="mb-3">Your Product Requests</h4>
            <div className="row">
                {requests.length === 0 ? (
                    <p>No product requests found.</p>
                ) : (
                    requests.map((req) => (
                        <div key={req.id} className="col-md-6 mb-3">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{req.brandName} - {req.productName}</h5>
                                    <p className="card-text">
                                        <strong>Category:</strong> {req.category?.categoryName}
                                    </p>
                                    <span className={`badge ${req.approved ? 'bg-success' : 'bg-warning text-dark'}`}>
                                        {req.approved ? 'Approved' : 'Pending Approval'}
                                    </span>

                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductRequests;
