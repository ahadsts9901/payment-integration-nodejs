import React, { useEffect, useState } from 'react'
import "./Cart.css"
import { useSelector, useDispatch } from "react-redux";
import { CartFill as CartIcon, CreditCard, XCircleFill } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../features/cart/cart.mjs';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { baseUrl } from "../../core.mjs"
import "dotenv/config"


const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart)

    const [totalPrice, setTotalPrice] = useState("")

    useEffect(() => {

        const total = cartItems.reduce((acc, item) => {
            return acc + (Number(item.price) * Number(item.quantity));
        }, 0);

        setTotalPrice(total.toFixed(2));

    }, [cartItems])

    const payNow = async () => {
        try {
            const stripe = await loadStripe(process.env.STRIPE_CLIENT_KEY);

            const body = {
                products: cartItems,
            };

            const headers = {
                "Content-Type": "application/json",
            };

            const response = await axios.post(`${baseUrl}/api/v1/payment`, body, {
                headers: headers,
            });

            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id,
            });

        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    return (
        <div className='cartContainer'>
            <h3>Your Cart {cartItems.length > 0 ? `( ${cartItems.length} Items )` : "Items"}</h3>
            {
                totalPrice > 0 ?
                    <div className='totalPriceCont'>
                        <h2 className='totalPriceOfAllProducts'>Total Price : ${totalPrice}</h2>
                        <button onClick={payNow} >Pay <CreditCard /></button>
                        <button onClick={() => { navigate("/") }} 
                        style={{marginLeft:"1em", width:"150px"}}
                        >Shop More <CartIcon /></button>
                    </div>
                    : null
            }
            <div className="cartItems">
                {
                    cartItems.length < 1 ?
                        <h2>
                            <CartIcon style={{ fontSize: "3em" }} />
                            <p>No Item</p>
                        </h2>
                        :
                        cartItems.map((item) => (
                            <div className='cartItem' style={{fontSize:"0.8em"}}>
                                <img src={item.image} alt='img' />
                                <h3>{item.name}</h3>
                                <p className='price'>${item.price}</p>
                                <p className='quantity'>
                                    <button onClick={() => { dispatch(decreaseQuantity(item.id)) }}>-</button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => { dispatch(increaseQuantity(item.id)) }}>+</button>
                                </p>
                                <p className='totalPriceOfPriduct'>${Math.floor((Number(item.price) * Number(item.quantity)))}</p>
                                <XCircleFill style={{ fontSize: "2em", cursor: "pointer" }} onClick={() => dispatch(removeFromCart(item.id))} />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Cart