import React, { useContext, useState } from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router';
import Header from '../Header/Header';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized
}


// Sign in using email and password 
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    // console.log(loggedInUser);

    // if only password and confirmed password matched then an user account created

    const [password, setPassword] = useState({
        passName: '',
        errorMesg: ''
    });
    const [conPassword, setConPassword] = useState({
        passName: '',
        errorMesg: ''
    });

    const { from } = location.state || { from: { pathname: "/" } };
    const [newUser, SetNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {                            // Check email validation using regular expression
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password' || e.target.name === 'confirmedPassword') {
            
            const isPasswordValid = e.target.value.length > 6;      // Check password validation, password length must be
            const passwordHasNumber = /\d{1}/.test(e.target.value); // greater than 6 and have at least one number.
            isFieldValid = isPasswordValid && passwordHasNumber;
            if (isFieldValid === false) {                           // if password pattern wrong show an message using alert popup
                alert('Wrong password pattern given. Please follow below instruction.');
            }
            
        }
        if (e.target.name === 'password') {
            const newPassword = { ...password };
            newPassword.passName = e.target.value;
            setPassword(newPassword);
        }
        if (e.target.name === 'confirmedPassword') {
            const newConPassword = { ...conPassword };
            newConPassword.passName = e.target.value;
            setConPassword(newConPassword);
        }
        if (password.passName !== conPassword.passName) {   // if password and confirmed password not match then show an error message.
            const newErrorMesg = { ...password };             
            newErrorMesg.errorMesg = "Password and Confirmed Password not Matched! Please give same password both field";
            setPassword(newErrorMesg);
        }


        if (isFieldValid) {                         
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }

    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {      
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)   // the info and update also
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);

                    updateUserName(user.name);
                })
                .catch((err) => {                       // if an error occur then set error message
                    const newUserInfo = { ...user };
                    newUserInfo.error = err.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {                             
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)   // password valid then sign in
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);

                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((err) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = err.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();

    }

    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        })
        .then(function () {
        })
        .catch(function (error) {
        });
    }

    /*** Google Authentication ***/

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch(err => {
                // const errorCode = err.code;
                // const errorMessage = err.message;
                const showError = {
                    error: err.message
                }
                setUser(showError);
            });
    }

    /*** Facebook Authentication ***/

    const handleFacebookSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(err => {
                // const errorCode = err.code;
                // const errorMessage = err.message;
                // const email = err.email;
                console.log(err.message);
                const showError = {
                    error: err.message
                }
                setUser(showError);
            });
    }

    return (
        <div className="main-container container-fluid">
            <Header/>
            <div className="row">
                <div className="col">
                    <div className="form-container">
                        <div className="form-content mt-5">
                            <form onSubmit={handleSubmit} className="">
                                <div >
                                    {newUser && password.passName !== conPassword.passName && <p className="text-warning">{password.errorMesg}</p>}
                                    <p className="text-danger">{user.error}</p>
                                    {
                                        user.success && <h4 className="text-success">User Created Successfully</h4>

                                    }
                                </div>
                                <h2>{newUser ? 'Create an Account' : 'Login'}</h2>
                                {newUser && <div class="mb-3">
                                    <input onBlur={handleBlur} type="text" class="form-control form-control-lg" id="exampleInputEmail1" name="name" placeholder="Name" required />
                                </div>}
                                <div class="mb-3">
                                    <input onBlur={handleBlur} type="email" class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Email" required />
                                </div>

                                <div class="mb-3">
                                    <input onBlur={handleBlur} type="password" class="form-control form-control-lg" id="exampleInputPassword1" name="password" placeholder="Password" required />
                                    <p>Give more than 6 digit including a number</p>
                                </div>
                                {newUser && <div class="mb-3">
                                    <input onBlur={handleBlur} type="password" class="form-control form-control-lg" id="exampleInputPassword1" name="confirmedPassword" placeholder="Confirmed Password" required />
                                    <p>Give more than 6 digit including a number</p>
                                </div>}
                                <input onClick={handleBlur} type="submit" class="btn btn-success w-100" value={newUser ? "CREATE AN ACCOUNT" : "LOGIN"} />
                                <h5>{newUser ? "Already have an account?" : "Don't have an account?"}<span>{newUser ? <span className="login-btn" onClick={() => SetNewUser(!newUser)}> Login now</span> : <span className="create-btn" onClick={() => SetNewUser(!newUser)}> Create an account</span>}</span></h5>
                            </form>
                        </div>
                    </div>
                    <div className="text-center divider pt-5">
                        <h2>Or Log in With</h2>
                        <hr />
                    </div>
                    <div className="google-container text-center pt-5">
                        <button className="btn btn-lg login-others" onClick={handleGoogleSignIn}> Continue With Google</button>
                        {
                            user.isSignedIn && <p>Welcome, {user.name}</p>
                        }
                    </div>
                    <div className="facebook-container text-center pt-3">
                        <button className="btn btn-lg login-others" onClick={handleFacebookSignIn}> Continue With Facebook</button>
                        {
                            user.isSignedIn && <p>Welcome, {user.name}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;