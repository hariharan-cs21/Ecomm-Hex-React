import axios from "axios";


export const setProductsDetails = async (dispatch) => {
    const response = await axios.get('http://localhost:8080/api/product/random');
    dispatch({
        payload: response.data,
        type: 'SET_PRODUCT_DETAILS'
    })
}