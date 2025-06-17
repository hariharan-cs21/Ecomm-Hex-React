import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCart } from '../../store/actions/CartActions';

const SellerProductList = () => {
    const dispatch = useDispatch();
    const [sellerProducts, setSellerProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const { productId } = useParams();
    const [msg, setMsg] = useState("")
    let token = localStorage.getItem("token")
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/${productId}/sellers`);
            setSellerProducts(response.data);

            const initialQuantities = {};
            response.data.forEach((product) => {
                initialQuantities[product.sellerProductId] = '';
            });
            setQuantities(initialQuantities);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleQuantityChange = (sellerProductId, value) => {
        setQuantities({ ...quantities, [sellerProductId]: value });
    };

    const addToCart = async (sellerProductId, stockQuantity) => {
        const quantity = quantities[sellerProductId]

        if (quantity < 1) {
            setMsg("Please enter a valid quantity (minimum 1).");
            return;
        }

        if (quantity > stockQuantity) {
            setMsg(`Only ${stockQuantity} items in stock. Please enter a lower quantity.`);
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/cart/add?sellerProductId=${sellerProductId}&quantity=${quantity}`,
                null,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }

                }
            );
            setMsg("Added to cart!");
            setCart(dispatch)(token);
        } catch (error) {
            setMsg("Login to use Cart");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mt-4">
            <h4 className="mb-3">Available Sellers</h4>
            <div className="row g-3">
                {msg !== "" && <div>
                    <div className="alert alert-info" >
                        {msg}
                    </div>
                </div>}
                {sellerProducts.map((sp, index) => (
                    <div className="col-md-6" key={index}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src={sp.imageUrl}
                                        className="img-fluid rounded-start h-100"
                                        alt={sp.productName}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-3 d-flex flex-column h-100">
                                        <h6 className="card-title mb-1 text-truncate">{sp.productName}</h6>
                                        <p className="text-muted mb-1 small">{sp.brandName}</p>
                                        <p className="mb-1"><strong>Seller:</strong> {sp.sellerName}</p>
                                        <p className="mb-1"><strong>Price:</strong> ₹{sp.price}</p>
                                        <p className={`mb-2 ${sp.stockQuantity > 0 ? 'text-success' : 'text-danger'}`}>
                                            <strong>Stock:</strong> {sp.stockQuantity}
                                        </p>

                                        <div className="mt-auto">
                                            <div className="input-group mb-2">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={quantities[sp.sellerProductId] || ''}
                                                    onChange={(e) => handleQuantityChange(sp.sellerProductId, e.target.value)}
                                                    disabled={sp.stockQuantity === 0}
                                                    placeholder="Qty"
                                                />
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    disabled={sp.stockQuantity === 0}
                                                    onClick={() => addToCart(sp.sellerProductId, sp.stockQuantity)}
                                                >
                                                    {sp.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {sellerProducts.length === 0 && (
                    <div className="col-12 text-center text-muted">No sellers available for this product.</div>
                )}
            </div>
        </div>
    );
};

export default SellerProductList;
