import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");


    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/category/getAll");
            setCategories(response.data);
        } catch (error) {
            setMessage("Failed to fetch categories.");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const addCategory = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return setMessage("Category name is required");

        try {
            if (editId) {
                await axios.put(
                    `http://localhost:8080/api/category/update/${editId}`,
                    { categoryName },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                setMessage("Category updated.");
            } else {
                await axios.post(
                    "http://localhost:8080/api/category/add",
                    { categoryName },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                setMessage("Category added.");
            }

            setCategoryName("");
            setEditId(null);
            fetchCategories();
        } catch (error) {
            setMessage("Failed to save category.");
        }
    };

    const handleEdit = (category) => {
        setCategoryName(category.categoryName);
        setEditId(category.id);
    };

    return (
        <div className="container my-4">
            <h4 className="mb-3">Manage Categories</h4>

            {message && (
                <div className="alert alert-primary" role="alert">
                    {message}
                </div>
            )}

            <div className="row g-4">
                <div className="col-md-4">
                    <form onSubmit={addCategory}>
                        <div className="mb-3">
                            <label className="form-label">Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            {editId ? "Update Category" : "Add Category"}
                        </button>
                    </form>
                </div>

                <div className="col-md-8">
                    <div className="row g-3">
                        {categories.map((category, ind) => (
                            <div className="col-6" key={category.id}>
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <span>{ind + 1}. {category.categoryName}</span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => handleEdit(category)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="col-12 text-center text-muted">
                                No categories available.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCategory;
