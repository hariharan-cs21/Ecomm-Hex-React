import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ProductsContainer } from './ProductsContainer';

const CategoryProduct = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/product/get/category/${categoryId}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch category products:", error);
            }
        };

        fetchProducts();
    }, []);
    const handleViewClick = (productId) => {
        navigate(`/customer/product/${productId}`);
    };

    return (
        <div className="container my-4">
            <h5 className="mb-3">Products in this Category</h5>
            <ProductsContainer products={products} handleViewClick={handleViewClick} />
        </div>
    );
};

export default CategoryProduct;
