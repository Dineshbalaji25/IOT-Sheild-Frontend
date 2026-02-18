import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/">IOT Shield</Link>
                </div>
                <ul className="navbar-links">
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/alerts" className={location.pathname === '/alerts' ? 'active' : ''}>
                            Alerts
                        </Link>
                    </li>
                    <li>
                        <Link to="/raw-data" className={location.pathname === '/raw-data' ? 'active' : ''}>
                            Raw Data
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
