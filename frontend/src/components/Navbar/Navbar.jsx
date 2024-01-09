import React from "react";
import "./Navbar.css";
import { Cart4, HouseFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const cartItems = useSelector(state => state.cart)
  const navigate = useNavigate()

  return (
    <>
      <div className="navBar">
        <h2>FakeStore</h2>
        {
          window.location.pathname === "/cart" || window.location.pathname === "/cart/" ?
            <div className="cartCont" onClick={() => navigate("/")}>
              <HouseFill />
            </div>
            :
            <div className="cartCont" onClick={() => navigate("/cart")}>
              <p>
                {cartItems.length == 0 ? null : cartItems.length}
              </p>
              <Cart4 />
            </div>
        }
      </div>
    </>
  );
};

export default Navbar;
