import React, { useReducer, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import NoMatchPage from './NoMatchPage';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './UserContext';
import Store from './Store';
import ProductsList from './ProductsList';
import Register from './Registration';

let initialUser = JSON.parse(localStorage.getItem('user')) || {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null,
};

let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      const loggedInUser = {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole,
      };
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return loggedInUser;
    case "logout":
      localStorage.removeItem('user');
      return {
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
        currentUserRole: null,
      };
    default:
      return state;
  }
};

const App = () => {
  let [user, dispatch] = useReducer(reducer, initialUser);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.isLoggedIn) {
      dispatch({
        type: "login",
        payload: {
          currentUserId: storedUser.currentUserId,
          currentUserName: storedUser.currentUserName,
          currentUserRole: storedUser.currentUserRole,
        },
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <div className='container-fluid'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store" element={<Store />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
