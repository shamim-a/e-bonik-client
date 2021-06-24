import React from 'react';
import { useHistory } from 'react-router-dom';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Products = (props) => {
    const { _id, name, imageURL, price, quantity } = props.pd;
    const history = useHistory();

    const handleBuyProduct = id => {
        history.push(`/product/${id}`);
    };

    return (
        <div className="main-card">
            <div className="card  m-3">
                <img src={imageURL} className="card-img-top" alt="productImg" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p>Price: {price} tk</p>
                    <p>Quantity: {quantity || 1}</p>
                    <span className="container"><button onClick={() => handleBuyProduct(_id)} className="btn px-5 cardBtn"> <span><FontAwesomeIcon icon={faShoppingCart}/></span> Buy Now</button></span>
                </div>
            </div>
        </div>


    );
};

export default Products;