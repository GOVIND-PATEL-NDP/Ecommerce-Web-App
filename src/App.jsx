import React, { useState } from 'react'
import Login from './Login'
import { Route, Routes} from 'react-router-dom'

import Dashboard from './Dashboard'
import NoMatchPage from './NoMatchPage'
import Navbar from './Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './UserContext'
import Register from './Registration'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Store from './Store';


const App = () => {

  let [user, setUser] = useState({
    isLoggedIn : false,
    currentUserId : null,
    curretUserName: null,   
  });
  return (
    

        <UserContext.Provider value={{user,setUser}}>
        <div className='container-fluid'>

          <Navbar></Navbar>
          <Routes>
          
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/navbar" element={<Dashboard />} />
              <Route path="/store" element={<Store />} />
              <Route path="*" element={<NoMatchPage />} />
          </Routes>
    </div>
    </UserContext.Provider>

  )
}

export default App