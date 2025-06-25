import { useEffect, useState } from "react";
import { ProductsContainer } from "./ProductsContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Category from "./Category"
const ProductPage = () => {
    const [products, setProd] = useState([])
    const [page, setPage] = useState(0);
    const navigate = useNavigate()
    const size = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:8080/api/product/random', {
                params: { page, size }
            });
            setProd(response.data)
        };
        fetchProducts();
    }, [page]);

    const handleViewClick = (productId) => {
        navigate(`/customer/product/${productId}`);
    };
    return (
        <>
            <Category />
            <h4 className="mb-3">Explore Products</h4>

            <ProductsContainer
                products={products}
                page={page}
                setPage={setPage}
                handleViewClick={handleViewClick}
            />
        </>
    );
};

export default ProductPage;
