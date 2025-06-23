import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SellerProducts = () => {
    const { id: productId } = useParams();
    const [products, setProducts] = useState([]);
    const [msg, setMsg] = useState("");
    const [data, setData] = useState({
        price: '',
        stockQuantity: ''
    });

    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState();
    const [name, setName] = useState("");

    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const fetchSellerProducts = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/seller-product/getProductsBySeller/${productId}`,
                config
            );
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching seller products", error);
        }
    };

    useEffect(() => {
        fetchSellerProducts();
    }, [productId]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addProduct = async () => {
        if (!data.price || !data.stockQuantity) {
            setMsg("Please enter all fields*");
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/seller-product/add/${productId}`,
                data,
                config
            );
            setMsg("Product added successfully");
            resetForm();
            fetchSellerProducts();
        } catch (error) {
            console.error("Error adding product", error);
            setMsg(error.response.data.message);
        }
    };

    const updateProduct = async () => {

        if (!data.price || !data.stockQuantity) {
            setMsg("Please enter all fields*");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/api/seller-product/update/${editId}`,
                data,
                config
            );
            setMsg("Product updated successfully");
            resetForm();
            fetchSellerProducts();
        } catch (error) {
            console.error("Error updating product", error);
            setMsg(error.response.data.message);
        }
    };

    const handleEditClick = (product, name) => {
        setName(name)
        setData({
            price: product.price,
            stockQuantity: product.stockQuantity
        });
        setIsEditMode(true);
        setEditId(product.sellerProductId);
    };

    const resetForm = () => {
        setData({ price: '', stockQuantity: '' });
        setIsEditMode(false);
        setEditId(null);
    };

    const handleSubmit = () => {
        isEditMode ? updateProduct() : addProduct();
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <h4>{isEditMode ? `Edit Product: ${name}` : "Add Product"}</h4>
                    {msg && <div className="alert alert-info py-1 text-center">{msg}</div>}
                    <hr />

                    <div className="mb-2">
                        <label>Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-2">
                        <label>Stock Quantity</label>
                        <input
                            type="number"
                            name="stockQuantity"
                            value={data.stockQuantity}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button className="btn btn-success w-100" onClick={handleSubmit}>
                        {isEditMode ? "Update Product" : "Add Product"}
                    </button>
                </div>

                <div className="col-md-6">
                    <h4>Seller Products (Product ID: {productId})</h4>
                    <hr />
                    {products
                        .map((product) => (
                            <div key={product.sellerProductId} className="card mb-3 shadow-sm">
                                <div className="row g-0">
                                    <div className="col-4 d-flex align-items-center justify-content-center">
                                        <img
                                            src={`/images/${product.imageUrl}`}
                                            alt={product.productName}
                                            className="img-fluid rounded p-2"
                                            style={{ maxHeight: '120px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {product.brandName} - {product.productName}
                                            </h5>
                                            <p className="card-text mb-1">Price: ₹{product.price}</p>
                                            <p className="card-text mb-2">Stock: {product.stockQuantity}</p>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleEditClick(product, product.productName)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SellerProducts;
