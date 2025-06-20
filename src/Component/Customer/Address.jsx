import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [msg, setMsg] = useState("");
    const [data, setData] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        contactNumber: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

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
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addAddress = async () => {
        if (!(data.city && data.contactNumber && data.street && data.postalCode && data.country)) {
            setMsg("Add all fields*");
            return;
        }
        try {
            await axios.post('http://localhost:8080/api/address/add', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData({
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

    const editAddress = async () => {
        if (!(data.city && data.contactNumber && data.street && data.postalCode && data.country)) {
            setMsg("Add all fields*");
            return;
        }
        try {
            await axios.put(`http://localhost:8080/api/address/update/${editId}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData({
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
                contactNumber: ''
            });
            setIsEditMode(false);
            setEditId(null);
            fetchAddresses();
        } catch (err) {
            console.error('Failed to update address', err);
        }
    };

    const deleteAddress = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/address/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchAddresses();
        } catch (err) {
            console.error('Failed to delete address', err);
        }
    };

    const handleEditClick = (addr) => {
        setIsEditMode(true);
        setEditId(addr.id);
        setData({
            street: addr.street,
            city: addr.city,
            state: addr.state,
            postalCode: addr.postalCode,
            country: addr.country,
            contactNumber: addr.contactNumber
        });
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <h4>{isEditMode ? "Edit Address" : "Add New Address"}</h4>
                    {msg && <div className="alert alert-info py-1 text-center">{msg}</div>}
                    <hr />
                    <div className="mb-2">
                        <label>Street</label>
                        <input
                            type="text"
                            name="street"
                            value={data.street}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={data.city}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={data.state}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label>Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={data.postalCode}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={data.country}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label>Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={data.contactNumber}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={isEditMode ? editAddress : addAddress}>
                        {isEditMode ? "Update Address" : "Add Address"}
                    </button>
                </div>

                <div className="col-md-6">
                    <h4>Saved Addresses</h4>
                    <hr />

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

                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleEditClick(addr)}>
                                        <FaEdit />
                                    </button>
                                    <button
                                        style={{ marginLeft: "5px" }}
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteAddress(addr.id)}>
                                        <FaTrash />
                                    </button>
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
