import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserContext } from './UserContext';

const Navbar = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const onLogoutClick = (event) => {
        event.preventDefault();
        userContext.dispatch({ type: 'logout' });
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary" style={{ marginRight: '100px' }}>
            <div className="container-fluid">
                <div className="navbar-brand">eCommerce</div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                    {userContext.user?.isLoggedIn && userContext.user?.currentUserRole === 'user' && (
    <>
        <li className="nav-item">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <i className="bi bi-speedometer2"></i> Dashboard
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink to="/store" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <i className="bi bi-shop"></i> Store
            </NavLink>
        </li>
    </>
)}

                        {userContext.user.isLoggedIn && userContext.user.currentUserRole === 'admin' && (
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    to="/products"
                                >
                                    <i className="bi bi-box"></i> Products
                                </NavLink>
                            </li>
                        )}
                        {!userContext.user.isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                        to="/login"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                        to="/register"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    {userContext.user.isLoggedIn && (
                        <div>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-person-circle"></i> {userContext.user.currentUserName}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#" onClick={onLogoutClick}>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
