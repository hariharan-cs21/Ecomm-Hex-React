import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProductsDetails } from "../../store/actions/ProductActions"

const UploadImages = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products);
    const [onlyMissing, setOnlyMissing] = useState(false);
    const [message, setMessage] = useState("");


    const handleSelect = async (e, productId) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.put(
                `http://localhost:8080/api/product/upload-pic/${productId}`,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            setProductsDetails(dispatch)
            setMessage("Upload successful");
        } catch (error) {
            setMessage(error.response.data.message || "Upload Failed");
        }
    };

    const filteredProducts = onlyMissing
        ? products.filter((product) => product.imageUrl === null)
        : products;

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between mb-3">
                <h5>Products</h5>
                {message && <div className="alert alert-info py-1">{message}</div>}

                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setOnlyMissing(!onlyMissing)}
                >
                    {onlyMissing ? "Show All" : "Show Missing Only"}
                </button>
            </div>

            <div className="row g-3">
                {filteredProducts.map((product) => (
                    <div className="col-6 col-sm-4 col-md-3" key={product.productId}>
                        <div className="card h-100 shadow-sm">
                            <div style={{ height: '180px' }}>
                                {product.imageUrl ? (
                                    <img
                                        src={"/images/" + product.imageUrl}
                                        alt={product.productName}
                                        className="card-img-top"
                                        style={{ height: '100%', objectFit: "contain" }}
                                    />
                                ) : (
                                    <div className="bg-light h-100 d-flex align-items-center justify-content-center">
                                        <span className="text-muted">No image</span>
                                    </div>
                                )}
                            </div>

                            <div className="card-body p-2">
                                <h6 className="mb-1 text-truncate">{product.productName}</h6>
                                <small className="text-muted">{product.brandName}</small>
                            </div>

                            <div className="card-footer bg-white border-0 text-center">
                                <label className="btn btn-sm btn-outline-primary w-100 mb-0">
                                    Upload Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleSelect(e, product.productId)}
                                        hidden
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="col-12 text-center text-muted">Nothing to show</div>
                )}
            </div>
        </div>
    );
};

export default UploadImages;
