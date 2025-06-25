import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewSellerProduct = () => {
    const { sellerId } = useParams();
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/seller-product/getProductsBySellerId/${sellerId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container my-4">
            <h4 className="mb-3">Products for Seller ID: {sellerId}</h4>

            <div className="row">
                {products.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    products.map((product) => (
                        <div key={product.sellerProductId} className="col-md-4 mb-4">
                            <div className="card">
                                <img
                                    src={`/images/${product.imageUrl}`}
                                    alt={product.productName}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                                <div className="card-body">
                                    <p className="text-muted mb-1 small">{product.brandName}</p>
                                    <h6 className="card-title mb-1 text-truncate">{product.productName}</h6>
                                    <p className="mb-1"><strong>Stock:</strong> {product.stockQuantity}</p>
                                    <p className="mb-1"><strong>Price:</strong> ₹{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewSellerProduct;
