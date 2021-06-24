import { faEdit, faPlus, faTasks, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './ManageProduct.css';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';

const ManageProduct = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://ebonikdb-1.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);


    // delete product btn handler
    const deleteProduct = (id) => {
        fetch(`https://ebonikdb-1.herokuapp.com/deleteProduct/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(result => {
            if (result) {
            //   console.log("deleted from database", result);
              document.getElementById('table-row').style.display = 'none';
            }
          });
    };

    const handleEdit = () => {
        // console.log("edit icon clicked");
    };

    return (
        <div className="row">
            <Header/>
            <br /><br />
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
            <div className="col-md-9 product-table-container" id="right">
                <table className="table table-striped checkout-table" title = "Manage Product">
                    <thead>
                        <tr>
                            <th className="th" scope="col">Product Name</th>
                            <th className="th" scope="col">Weight</th>
                            <th className="th" scope="col">Price</th>
                            <th className="th" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        products.map(pd =>
                            <tr className="tr" id="table-row">
                                <td className="td">{pd.name}</td>
                                <td className="td">{pd.weight}</td>
                                <td className="td">{pd.price}</td>
                                <td className="td">
                                    <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={handleEdit} />
                                    <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => deleteProduct(pd._id)} />
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;