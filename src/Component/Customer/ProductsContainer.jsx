//this is a reusablle code
export const ProductsContainer = (props) => {
    return (
        <div className="row g-3">
            {props.products.map((product) => (
                <div className="col-6 col-sm-4 col-md-3" key={product.productId}>
                    <div className="card border-0 shadow-sm h-100">
                        <img
                            src={`/images/${product.imageUrl}`}
                            className="card-img-top"
                            alt={product.productName}
                            width="70px"

                        />
                        <div className="card-body p-2">
                            <h6 className="card-title mb-1 text-truncate">{product.productName}</h6>
                            <small className="text-muted">{product.brandName}</small>
                        </div>
                        <div className="card-footer bg-white border-0 text-center">
                            <button
                                className="btn btn-sm btn-outline-primary w-100"
                                onClick={() => props.handleViewClick(product.productId)}
                            >
                                View
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {props.products.length === 0 && (
                <div className="col-12 text-center text-muted">No products available.</div>
            )}
        </div>
    );

}
