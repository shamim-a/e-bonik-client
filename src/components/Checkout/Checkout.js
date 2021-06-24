import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loggedInUser] = useContext(UserContext);

    useEffect(() => {
        const url = `https://ebonikdb-1.herokuapp.com/product/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data[0]))
    }, [id]);

    const handleCheckout = () => {
        const orderDetails = {
            user: {
                name: loggedInUser.displayName,
                email: loggedInUser.email
            },
            time: new Date(),
            item: product
        }

        fetch('https://ebonikdb-1.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                alert("Your Order has been Placed Successfully");
            })
            .catch(err => console.log('error', err))
    };

    return (
        <div className="check-container">
            <h2 className="checkout-heading">Checkout</h2>
            <div>
                <table className="table table-striped checkout-table">
                    <thead>
                        <tr>
                            <th className="th" scope="col">Description</th>
                            <th className="th" scope="col">Quantity</th>
                            <th className="th" scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="td">{product.name}</td>
                            <td className="td">{product.quantity}</td>
                            <td className="td">{product.price}</td>
                        </tr>
                        <tr>
                            <td className="td" colSpan="2">total</td>
                            <td className="td">{product.price}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleCheckout} className="btn btn-success checkout-btn">Checkout</button>
                <Link to ="/home" className ="text-decoration-none"><button className=" btn btn-danger checkout-btn">Back</button></Link> 
            </div>
            
        </div>
    );
};

export default Checkout;