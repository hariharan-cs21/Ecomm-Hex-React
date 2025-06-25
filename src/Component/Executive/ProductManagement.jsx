import { Link } from "react-router-dom";

const ProductManagement = () => {
    return (
        <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Upload Product Image</h5>
                            <p className="card-text">Upload images for existing products</p>
                            <Link to="/executive/upload-images" className="btn btn-primary">Go</Link>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Manage Categories</h5>
                            <p className="card-text">Add, edit, or delete product categories.</p>
                            <Link to="/executive/manage-cateogry" className="btn btn-primary">Go</Link>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Add New Product</h5>
                            <p className="card-text">Create a new product and assign a category.</p>
                            <Link to="/executive/add-product" className="btn btn-primary">Go</Link>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Seller Details</h5>
                            <p className="card-text">View or edit seller information.</p>
                            <Link to="/executive/seller-details" className="btn btn-primary">Go</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
