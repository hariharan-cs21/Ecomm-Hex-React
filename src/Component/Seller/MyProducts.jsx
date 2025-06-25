import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchMyProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/seller-product/getProductsOfSeller', config);
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError("Unable to load products. Please try again later.");
        }
    };

    useEffect(() => {
        fetchMyProducts();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center fw-bold">🛍️ My Product Listings</h2>

            {error &&
                <div className="alert alert-danger text-center">{error}</div>
            }
            {products.length === 0 &&
                <div className="text-center text-muted fs-5">No products found.</div>
            }
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div key={product.sellerProductId} className="col">
                        <div className="card h-100 shadow-sm border-0 hover-shadow">
                            <img
                                src={`/images/${product.imageUrl}`}
                                alt={product.productName}
                                className="card-img-top"
                                style={{ height: '200px', objectFit: "contain" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-1">
                                    <strong>{product.brandName}</strong>
                                </h5>
                                <p className="text-muted">{product.productName}</p>

                                <div className="mt-auto">
                                    <p className="card-text mb-1">
                                        <span className="fw-bold">₹{product.price}</span>
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className={`badge ${product.stockQuantity > 0 ? 'bg-success' : 'bg-danger'}`}>
                                            {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
                                        </span>
                                        <Link
                                            to={`/seller/seller-products/${product.sellerProductId}`}
                                            className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                                        >
                                            <i className="bi bi-gear-fill"></i> Manage
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProducts;
