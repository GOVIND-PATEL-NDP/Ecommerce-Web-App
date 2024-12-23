import React from 'react';
import ReactDOM from 'react-dom/client';
import jQuery from 'jquery';
import  'popper.js/dist/umd/popper'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



import App from './App';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><App/></BrowserRouter>);
