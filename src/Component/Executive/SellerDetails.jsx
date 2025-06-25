import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerDetails = () => {
    const [sellers, setSellers] = useState([]);



    const fetchSellers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/user/getSellers", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            setSellers(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchSellers();
    }, []);

    return (
        <div className="container my-4">
            <h4 className="mb-3">Seller Details</h4>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>S.no</th>
                            <th>Seller Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller, index) => (
                            <tr key={seller.id}>
                                <td>{index + 1}</td>
                                <td>{seller.name}</td>
                                <td>{seller.user.username}</td>
                            </tr>
                        ))}
                        {sellers.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center text-muted">No sellers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerDetails;
