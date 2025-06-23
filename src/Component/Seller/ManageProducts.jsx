import React, { useState, useEffect } from 'react'
import Category from "../Customer/Category"
import { useSelector } from 'react-redux'
import { ProductsContainer } from "../Customer/ProductsContainer"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ManageProducts = () => {
    const user = useSelector(state => state.user)
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const [categoryId, setCategoryId] = useState()
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
    }, [categoryId]);
    const handleViewClick = (productId) => {
        navigate(`/seller/seller-products/${productId}`);
    };
    return (
        <div>
            <Category setCategoryId={setCategoryId} role={user.role || localStorage.getItem("role")} />
            <ProductsContainer handleViewClick={handleViewClick} products={products} />
        </div>
    )
}

export default ManageProducts