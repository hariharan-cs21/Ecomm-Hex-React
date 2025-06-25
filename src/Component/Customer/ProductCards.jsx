import { useEffect, useState } from "react";
import { ProductsContainer } from "./ProductsContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Category from "./Category"
import { useSelector } from "react-redux";
const ProductPage = () => {
    const [products, setProd] = useState([])
    const [page, setPage] = useState(0);
    const navigate = useNavigate()
    const word = useSelector(state => state.word.Searchword)
    const size = 8;
    console.log(word);


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
    const filteredData = word
        ? products.filter(i => i.productName.toLowerCase().includes(word.toLowerCase()))
        : products;
    return (
        <>
            <Category />
            <h4 className="mb-3">Explore Products</h4>

            <ProductsContainer
                products={filteredData}
                page={page}
                setPage={setPage}
                handleViewClick={handleViewClick}
            />
        </>
    );
};

export default ProductPage;
