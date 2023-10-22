import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch , useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import {removeProduct,decrementProduct,incremenProduct} from "../../redux/cartSlice";
import "./NavBar.scss";

export const NavBar = ({childToParent}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const { cart } = useSelector((state) => state.cart);
  const cartNumber = cart.reduce((a, c) => {
    return a + c.quntity;
  }, 0);
  let truncate = (name) => {
    return  name.split(' ').slice(0, 3).join(' ');
  }

    const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value)
    childToParent(value)
  };
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand className="w-25">
          <Link to={"/"}>
          <img
            alt="profile"
            className="profile-w"
            src={require("../../assets/images/user.png")}
          />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-lg-flex justify-content-center align-items-center nav-small">
          <input className="form-control search-input me-sm-5 my-sm-4 my-md-3" 
          onChange={handleInputChange}
           value={searchText}
           type="search"
           placeholder="Search"
            aria-label="Search"
          /> 
           <p className="cart-number"> {cartNumber}</p>
            <NavDropdown
              title={<AiOutlineShoppingCart size={35} />}
              id="basic-nav-dropdown"
              className="cart-icon"
             
            >
              {cart.map((item, i) => {
                return (
                  <div
                    className="d-flex py-2 align-items-center my-1 border-bottom"
                    key={`${item} ${i}`}
                  >
                    <img alt="cart-img" className="cart-img" src={item.image} />
                    <div className="ms-3 row">
                      <div className="col-12">
                      <h6 className="w-100">{truncate(item.title)}</h6>
                      </div>
                      <div className="d-flex justify-content-between align-items-center ">
                     <div>
                     <button onClick={()=>{
                          dispatch(incremenProduct(item.id))
                        }}  className="cart btn btn-secondary px-2 py-1 me-2">
                        <AiOutlinePlus/>
                      </button>
                      {item.quntity}
                      <button onClick={()=>{
                          dispatch(decrementProduct(item.id))
                        }}  className="cart btn btn-secondary px-2 py-1 mx-2">
                        {" "}
                        <AiOutlineMinus />
                      </button>
                     </div>
                     <button onClick={()=>{
                          dispatch(removeProduct(item.id))
                        }}  className="cart btn btn-danger px-2 py-1 "> 
                         <BsTrash className="mx-1  text-light"/>
                      </button>
                      </div>
                     
                    </div>
                  </div>
                );
              })}
              <div 
              onClick={() => navigate("/review")}
               className="navbar-brand text-center ">
                Review
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
