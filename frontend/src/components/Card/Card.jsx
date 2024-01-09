import React from "react";
import "./Card.css";
import { Cart4 } from "react-bootstrap-icons";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, increaseQuantity } from '../../features/cart/cart.mjs'

const Card = (props) => {

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  let editedDesc = props.description.split(" ").slice(0, 10).join(" ");

  const addToCartFun = (title, description, image, price, name, id) => {

    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex === -1) {
      dispatch(addToCart({
        title: title,
        description: description,
        image: image,
        price: price,
        name: name,
        id: id,
      }))
    } else {
      dispatch(increaseQuantity(id))
    }

  }

  return (
    <div className="card" style={{ width: "10rem" }}>
      <img
        className="cardImg card-img-top"
        src={props.image}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{editedDesc}</p>
        <div className="buttonCont">
          <p>{props.price} $</p>
          <a onClick={() => {
            addToCartFun(props.title, props.description, props.image, props.price, props.name, props.id)
          }} className="cardButton btn btn-primary">
            <Cart4 /> Add To Cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
