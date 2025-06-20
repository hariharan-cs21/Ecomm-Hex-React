import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import { ProductsContainer } from './ProductsContainer';

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
        <div className="container my-4">
            <Category />
            <h4 className="mb-3">Explore Products</h4>
            <ProductsContainer handleViewClick={handleViewClick} products={products} />
        </div>
    );
};

export default ProductCards;
