import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export const ProductsContainer = ({ products, page, setPage, handleViewClick }) => {
    return (
        <>
            {setPage &&
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setPage(Math.max(page - 1, 0))}
                        disabled={page === 0}
                    >
                        <AiOutlineLeft />
                    </button>
                    <span className="text-muted small">Page {page + 1} </span>
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setPage(page + 1)}
                    >
                        <AiOutlineRight />
                    </button>
                </div>
            }

            <div className="row g-3">
                {products.map((product) => (
                    <div className="col-6 col-sm-4 col-md-3" key={product.productId}>
                        <div className="card border-0 shadow-sm h-100">
                            <img
                                src={`/images/${product.imageUrl}`}
                                className="card-img-top"
                                alt={product.productName}
                            />
                            <div className="card-body p-2">
                                <h6 className="card-title mb-1 text-truncate">{product.productName}</h6>
                                <small className="text-muted">{product.brandName}</small>
                            </div>
                            <div className="card-footer bg-white border-0 text-center">
                                <button
                                    className="btn btn-sm btn-outline-primary w-100"
                                    onClick={() => handleViewClick(product.productId)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <div className="col-12 text-center text-muted">No products available.</div>
                )}
            </div>
        </>
    );
};
