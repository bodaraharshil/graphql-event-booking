import React from 'react';
import { NavLink } from 'react-router-dom';

import './Mainnavigation.css';

const Mainnavigation = (props) => {
    return (
        <header className="main_navigation">
            <div className="main_navigation_logo">
                <h1>EasyEvent</h1>
            </div>
            <nav className="main_navigation_item">
                <ul>
                    <li>
                        <NavLink to="/auth">Authenticate</NavLink>
                    </li>
                    <li>
                        <NavLink to="/event">Events</NavLink>
                    </li>
                    <li>
                        <NavLink to="/booking">Bookings</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Mainnavigation;