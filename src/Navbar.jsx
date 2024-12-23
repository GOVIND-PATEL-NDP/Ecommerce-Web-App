import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './UserContext';


const  Navbar = ()=> {
    // get context
    const navigate = useNavigate();
    let userContext = useContext(UserContext);

   
    let onLogoutClick = (event) => {
        event.preventDefault();
        userContext.setUser({ isLoggedIn: false, currentUserId: null, currentUserName: null });
        navigate("/"); // Navigate to the Login page
    };
  return (
      <nav className="navbar navbar-expand-lg style={{ marginRight: 100px }}">
          <div>eCommerce</div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                  {userContext.user.isLoggedIn ? (<li className="nav-item active ">
                      <NavLink className="nav-link " to="/dashboard" activeclassName="active"><i class="bi bi-speedometer2"></i> Dashboard </NavLink>
                  </li>) : ("")}
                  {userContext.user.isLoggedIn ? (<li className="nav-item active ">
                      <NavLink className="nav-link " to="/store" activeclassName="active"><i class="bi bi-shop"></i> Store </NavLink>
                  </li>) : ("")}
                  {userContext.user.isLoggedIn ? (<li>
                      <NavLink className="nav-link" to="/" activeclassName="active">Login </NavLink>
                  </li>):("")}
                  {userContext.user.isLoggedIn ? (<li>
                      <NavLink className="nav-link" to="/register" activeclassName="active">Register </NavLink>
                  </li>):("")}
              </ul>
              {userContext.user.isLoggedIn ? (<div style={{ marginRight: 100 }}>
                  <ul>
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span><i className="bi bi-person-circle"></i></span> {userContext.user.currentUserName}
                          </a>
                          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <a className="dropdown-item" href="/#" onClick={onLogoutClick}>Logout</a>
                          </div>
                      </li>
                  </ul>
              </div>):("")}
              
          </div>
      </nav>
  )
}

export default Navbar