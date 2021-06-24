import React from 'react';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const Admin = () => {
    return (
        <div>
            <Header/>
            <br />
            <div >
            <br /><br /><br />
            <h3 className="text-center">This is Admin Sector</h3>
            <div className="col-md-3" id="left">
                <h2>eBonik.com</h2>
                <Link to='/manageProduct' className="btn product-btn">
                    <FontAwesomeIcon icon={faTasks} /> Manage Product
                    </Link>
                <Link to='/addProduct' className="btn product-btn">
                    <FontAwesomeIcon icon={faPlus} /> Add Product
                    </Link>
                <Link to='/editProduct' className="btn product-btn">
                    <FontAwesomeIcon icon={faEdit} /> Edit Product
                    </Link>
            </div>
            <div className="col-md-9" id="right">
            </div>
        </div>
        </div>
        
    );
};

export default Admin;