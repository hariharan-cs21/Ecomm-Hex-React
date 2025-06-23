import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Category = (props) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/category/getAll");
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="container my-4">
            {props.role !== "SELLER" &&
                <div className="mb-3 px-3 py-2 bg-light border rounded text-center">
                    <h6 className="mb-1">🛍️ Shop by Category</h6>
                </div>
            }
            <div className="d-flex overflow-auto pb-2">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="flex-shrink-0 me-3"
                        style={{ width: '200px' }}
                    >
                        <div className="p-2 border rounded text-center bg-white shadow-sm h-100">
                            <div className="mb-2  fw-semibold">{cat.categoryName}</div>
                            {props.role !== "SELLER" ?
                                <Link to={`/customer/category/${cat.id}`} className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center gap-1 mx-auto">
                                    <FiShoppingBag size={14} />
                                    <span >Shop</span>
                                </Link>
                                :
                                <p onClick={() => props.setCategoryId(cat.id)} className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center gap-1 mx-auto">
                                    <span >Show Products</span>
                                </p>
                            }
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Category;
