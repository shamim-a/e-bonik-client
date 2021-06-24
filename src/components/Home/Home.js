import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Products from '../Products/Products';

const Home = () => {
    const [products, setProducts] = useState([]);

    const toggleSpinner = () => {
        document.getElementById('spinner-loader').classList.toggle('d-none');
    };

    useEffect(() => {
        toggleSpinner();
        fetch('https://ebonikdb-1.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                toggleSpinner();
            })
    }, []);

    return (
        <div>
            <Header/>
            <br /><br /><br />
            <h1 align = "center">Products</h1>
            <hr />
            <div className=" d-flex justify-content-center">
                <div className="spinner-border text-dark m-3 d-none" id="spinner-loader" role="status">
                    <span className="visually-hidden"></span>
                </div>
            </div>
            <div className="row justify-content-center">
                {
                    products.map(pd => <Products pd={pd} key={pd._id} ></Products>)
                }
            </div>
        </div>
    );
};

export default Home;