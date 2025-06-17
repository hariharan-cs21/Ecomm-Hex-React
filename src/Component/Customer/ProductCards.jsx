import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCards = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/product/random');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);

            }
        };
        fetchProducts();
    }, []);

    const handleViewClick = (productId) => {
        navigate(`/customer/product/${productId}`);
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-3">Explore Products</h4>
            <div className="row g-3">
                {products.map((product) => (
                    <div className="col-6 col-sm-4 col-md-3" key={product.productId}>
                        <div className="card border-0 shadow-sm h-100">
                            <img
                                src={product.imageUrl}
                                className="card-img-top"
                                alt={product.productName}

                            />
                            <div className="card-body p-2">
                                <h6 className="card-title mb-1 text-truncate">{product.productName}</h6>
                                <small className="text-muted">{product.brandName}</small>
                            </div>
                            <div className="card-footer bg-white border-0 text-center">
                                <button
                                    className="btn btn-sm btn-outline-primary w-100"
                                    onClick={() => handleViewClick(product.productId)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <div className="col-12 text-center text-muted">No products available.</div>
                )}
            </div>
        </div>
    );
};

export default ProductCards;
