import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './Mainnavigation.css';

const Mainnavigation = (props) => {
    return (
        <AuthContext.Consumer>
            {(context) => {
                return (
                    <header className="main_navigation">
                        <div className="main_navigation_logo">
                            <h1>EasyEvent</h1>
                        </div>
                        <nav className="main_navigation_item">
                            <ul>
                                {console.log("123456789012345678963", context)}
                                {
                                    !context.token &&
                                    <li>
                                        <NavLink to="/auth">Authenticate</NavLink>
                                    </li>
                                }
                                <li>
                                    <NavLink to="/event">Events</NavLink>
                                </li>
                                {
                                    context.token &&
                                    <li>
                                        <NavLink to="/booking">Bookings</NavLink>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </header>
                )
            }
            }

        </AuthContext.Consumer>
    )
}

export default Mainnavigation;