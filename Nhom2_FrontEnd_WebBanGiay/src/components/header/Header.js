import React from "react";
import { Fragment, useState, useEffect } from "react";
import logo from "../header/logo2.png";
import { Link } from "react-router-dom";
import "../../styles/main_styles.css";
import { useContextUser } from "../../context/global";
import axios from "axios";

const HeaderWeb = ({ setShow, size }) => {
  const [fname, setFname] = useState(false);
  const { totalCart} = useContextUser();
  
  let name=localStorage.getItem('users')

  const handleLogout = () => {


    axios
      .get(`http://localhost:5000/customer/logout`)
      .then((user) => {
        localStorage.removeItem('users')
        document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/login'
      })
      .catch((error) => {
        console.log(error)
      });

  }

  return (
    <Fragment>
      <div className="super_container">
        <header className="header trans_300">
          <div className="top_nav">
            <div className="container">
              <div className="row">
                <div className="col-md-6  col-sm-12">
                  <div className="top_nav_left">
                    free shipping on all VietNam orders over 50.000VND
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 text-right">
                  <div className="top_nav_right">
                    <ul className="top_nav_menu">
                      <li className="account">
                        <Link>
                        {name?name:"My Account "}
                          <i className="bi bi-chevron-down"></i>
                        </Link>
                        {!name &&
                        <ul className="account_selection">
                          <li>
                            <Link to="/login">
                              <i
                                className="bi bi-box-arrow-in-right"
                                aria-hidden="true"
                              ></i>
                              Sign In
                            </Link>
                          </li>
                          <li>
                            <Link to="/Signup">
                              <i
                                className="bi bi-person-fill-add"
                                aria-hidden="true"
                              ></i>
                              Register
                            </Link>
                          </li>
                        </ul>
                        }

                        {name && <ul className="account_selection">
                          <li onClick={handleLogout}>
                           <Link to="">
                            <i
                              className="bi bi-box-arrow-in-right"
                              aria-hidden="true"
                            ></i>
                            Logout
                            </Link>
                          </li>
                        </ul>}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main_nav_container">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-right">
                  <div className="logo_container">
                    <Link to="/cart">
                      <img src={logo} alt="" />
                    </Link>
                  </div>
                  <nav className="navbar">
                    <ul className="navbar_menu">
                      {/* <li>
                        <Link to="/">home</Link>
                      </li> */}
                      <li>
                        <Link to="/cart">Home</Link>
                      </li>
                      {/* <li>
                        <Link to="/product">Product</Link>
                      </li> */}
                      {/* <li>
                        <Link to="/category">Category</Link>
                      </li> */}
                      <li>
                        <Link to="/Blog">Blog</Link>
                      </li>
                      <li>
                        <Link to="/contact">contact</Link>
                      </li>
                    </ul>
                    <ul className="navbar_user">
                      <li className="checkout ">
                        <Link to="/cart/detail">
                          <i className="bi bi-cart-fill" aria-hidden="true"></i>
                          <span id="checkout_items" className="checkout_items">
                            {totalCart?.length}
                          </span>
                        </Link>
                      </li>
                    </ul>
                    <div className="hamburger_container">
                      <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </Fragment>
  );
};

export default HeaderWeb;
