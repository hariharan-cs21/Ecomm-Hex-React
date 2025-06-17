import { useState, useEffect } from 'react';
import axios from 'axios';

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [data, setdata] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        contactNumber: ''
    });

    const token = localStorage.getItem('token');

    const fetchAddresses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/address/list', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAddresses(res.data);
        } catch (err) {
            console.error('Error fetching addresses', err);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const addAddress = async () => {
        try {
            await axios.post('http://localhost:8080/api/address/add', data, {
                headers: { Authorization: "Bearer " + token }
            });
            setdata({
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
                contactNumber: ''
            });
            fetchAddresses();
        } catch (err) {
            console.error('Failed to add address', err);
        }
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <h4>Add New Address</h4>

                    <div className="mb-3">
                        <label >Street</label>
                        <input
                            type="text"
                            name="street"
                            value={data.street}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label >City</label>
                        <input
                            type="text"
                            name="city"
                            value={data.city}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label >State</label>
                        <input
                            type="text"
                            name="state"
                            value={data.state}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label >Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={data.postalCode}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label >Country</label>
                        <input
                            type="text"
                            name="country"
                            value={data.country}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label >Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={data.contactNumber}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button className="btn btn-primary" onClick={addAddress}>
                        Add Address
                    </button>
                </div>

                <div className="col-md-6">
                    <h4>Saved Addresses</h4>
                    {addresses.length === 0 ? (
                        <p>No addresses found.</p>
                    ) : (
                        addresses.map((addr) => (
                            <div key={addr.id} className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h6 className="card-title">{addr.customer.name}</h6>
                                    <p className="card-text mb-1">{addr.street}</p>
                                    <p className="card-text mb-1">
                                        {addr.city}, {addr.state}, {addr.postalCode}
                                    </p>
                                    <p className="card-text mb-1">{addr.country}</p>
                                    <p className="card-text"><strong>Contact:</strong> {addr.contactNumber}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Address;
