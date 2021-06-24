import { faEdit, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const makeInputsEmpty = () => {
        document.getElementById('pd-name').value = "";
        document.getElementById('pd-price').value = "";
        document.getElementById('pd-quantity').value = "";
        document.getElementById('pd-weight').value = "";
        document.getElementById('pd-file').value = "";
    };

    const onSubmit = (data) => {
        const {name, price, quantity, weight} = data;
        const productData = { name, price, quantity, weight, imageURL: imageURL };

        const url = 'https://ebonikdb-1.herokuapp.com/addProduct';
        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'Application/json' },
            body: JSON.stringify(productData)
        })
            .then(res => console.log(res))
        
        makeInputsEmpty();
    };

    const handleImageUpload = (event) => {
        const imgData = new FormData();
        imgData.set('key', "30002a095cd46686e7cf9f00957005a5");
        imgData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imgData)
            .then(res => {
                setImageURL(res.data.data.display_url)
                // console.log(res.data.data.display_url)
            })
            .catch(err => console.log("error", err))
    };
    return (
        <div className="row">
            <Header/>
            <br /> <br />
            <br />
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
                <div className="form-container form-container-addproduct">
                    <form className="form-div" onSubmit={handleSubmit(onSubmit)}>
                        <input placeholder="Product Name" {...register("name")} id="pd-name" />
                        <br />
                        <input placeholder="Price" {...register("price")} id="pd-price" />
                        <br />
                        <input defaultValue="1" placeholder="Quantity" {...register("quantity")} id="pd-quantity" />
                        <br />
                        <input placeholder="Weight" {...register("weight")} id="pd-weight" />
                        <br />
                        <input type="file" {...register("exampleRequired", { required: true })} onChange={handleImageUpload} id="pd-file" />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <input className="btn submit-btn btn-primary" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
