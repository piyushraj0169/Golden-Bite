import { useContext, useState } from "react"
import { StoreContext } from "../context/StoreContext"
import { LuIndianRupee } from "react-icons/lu"
import { FaCartPlus, FaPlusSquare, FaSearch } from "react-icons/fa"
import { FaSquareMinus } from "react-icons/fa6"

function ProductList() {
    const { product_list, cartItems, addToCart, removeFromCart } = useContext(StoreContext)
    const [search, setSearch] = useState("")

    const filtered = product_list.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="container mt-2 mb-5">
            {/* Store Section Header */}
            <div className="text-center mb-5 feature-section-header">
                <span className="feature-subtitle-badge mb-3 d-inline-block">Fresh Collection</span>
                <h2 className="feature-main-header mb-3 text-white">Our <span className="text-gold">Assortment</span></h2>
                <div className="feature-description mx-auto" style={{ maxWidth: '650px' }}>
                    <p>Discover our selection of premium baked goods, handcrafted with love and the finest ingredients.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="row justify-content-center mb-5">
                <div className="col-lg-6 col-md-8">
                    <div className="product-search-wrapper">
                        <FaSearch className="product-search-icon" size={18} color="#ffce00" />
                        <input
                            type="text"
                            className="product-search-input"
                            placeholder="Search for cakes, pastries, cookies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className="product-search-clear" onClick={() => setSearch("")}>&times;</button>
                        )}
                    </div>
                </div>
            </div>

            <div className="row g-4 justify-content-center">
                {filtered.length === 0 ? (
                    <div className="text-center py-5">
                        <FaSearch size={40} className="text-secondary mb-3" />
                        <h5 className="text-light">No products found for "{search}"</h5>
                        <p className="text-secondary small">Try a different search term.</p>
                    </div>
                ) : (
                    filtered.map((product) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch" key={product._id}>
                            <div className="product-card w-100">
                                <div className="product-img-wrapper position-relative">
                                    <img src={product.image} className="product-card-img" alt={product.name} />
                                    {product.isAvailable === false && (
                                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '15px 15px 0 0', zIndex: 10 }}>
                                            <span className="badge bg-danger fs-6 py-2 px-3 fw-bold border border-light shadow" style={{ letterSpacing: '1px' }}>OUT OF STOCK</span>
                                        </div>
                                    )}
                                </div>
                                <div className="product-card-body">
                                    <h5 className="product-title mb-1">{product.name}</h5>
                                    {product.description && (
                                        <p className="small m-0 mb-2" style={{color: '#adb5bd', fontSize: '0.85rem', fontWeight: 500}}>{product.description}</p>
                                    )}

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <p className="product-price m-0"> <LuIndianRupee className="mb-1" /> {product.price}</p>

                                        {
                                            product.isAvailable === false ? (
                                                <div className="add-cart-overlay" style={{ cursor: 'not-allowed', opacity: 0.5 }}>
                                                    <FaCartPlus className="add-to-cart-btn text-secondary" />
                                                </div>
                                            ) : !cartItems[product._id] ? (
                                                <div className="add-cart-overlay" onClick={() => addToCart(product._id)}>
                                                    <FaCartPlus className="add-to-cart-btn" />
                                                </div>
                                            ) : (
                                                <div className="cart-counter-container d-flex align-items-center">
                                                    <FaSquareMinus className="cart-icon-minus action-btn" onClick={() => removeFromCart(product._id)} />
                                                    <span className="cart-counter-text mx-2">{cartItems[product._id]}</span>
                                                    <FaPlusSquare className="cart-icon-plus action-btn" onClick={() => addToCart(product._id)} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default ProductList