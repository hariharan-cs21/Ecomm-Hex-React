import { useEffect, useState } from 'react';
import axios from 'axios';

const AddNewProduct = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [inputData, setinputData] = useState({
        brandName: "",
        productName: "",
        imageUrl: null,
    });
    const [message, setMessage] = useState("");



    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/category/getAll");
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchProductsByCategory = async (categoryId) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/product/get/category/${categoryId}`);
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };



    const handleChange = (e) => {
        setinputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategory) return alert("Select a category");

        try {
            await axios.post(`http://localhost:8080/api/product/create/${selectedCategory}`, inputData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setMessage("Product added");
            setinputData({ brandName: "", productname: "", imageUrl: null });
            fetchProductsByCategory(selectedCategory);
        } catch (err) {
            setMessage("Failed to add product");
        }
    };

    return (
        <div className="container my-4">
            <h4 className="mb-4">Add & View Products</h4>

            {message && <div className="alert alert-primary">{message}</div>}

            <div className="row g-4">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value)
                                    fetchProductsByCategory(e.target.value)
                                }}
                                value={selectedCategory || ""}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Brand Name</label>
                            <input
                                type="text"
                                name="brandName"
                                className="form-control"
                                value={inputData.brandName || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                name="productName"
                                className="form-control"
                                value={inputData.productName || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <button type="submit" className="btn btn-primary w-100">
                            Add Product
                        </button>
                    </form>
                </div>

                <div className="col-md-8">
                    <div className="row g-3">
                        {products.map((p) => (
                            <div className="col-6" key={p.productId}>
                                <div className="card border-0 shadow-sm h-100">
                                    <img
                                        src={"/images/" + p.imageUrl}
                                        alt={p.productname}
                                        className="card-img-top"
                                        style={{ height: "160px", objectFit: "contain" }}
                                    />
                                    <div className="card-body">
                                        <h6 className="mb-1 text-truncate">{p.productName}</h6>
                                        <small className="text-muted">{p.brandName}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {!products.length && selectedCategory && (
                            <div className="col-12 text-center text-muted">
                                No products found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;
