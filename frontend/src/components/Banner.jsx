import { Link } from 'react-router-dom';

function Banner({ header_text, header_line }) {
    return (
        <div className="banner">
            <div className="container h-100 d-flex align-items-center">
                <div className="banner-content">
                    <span className="banner-badge mb-3 d-inline-block">✨ Premium Bakery & Pastries</span>
                    <h1 className="header_text mb-4">
                        {header_text} <span className="text-gold">Delight!</span>
                    </h1>
                    <p className="header_line mb-5">{header_line}</p>
                    <div className="banner-buttons d-flex gap-3 flex-wrap">
                        <Link to="/ProductList" className="btn-order">
                            Order Now
                        </Link>
                        <Link to="/ProductList" className="btn-gold-outline">
                            Explore Menu
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;