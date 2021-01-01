import React, { useContext } from "react";
import CartContext from "../../../util/cartContext";
import "./cart.css";
import {Cart2} from 'bootstrap-icons-react';

function Cart() {
    const { cartState, setCartState } = useContext(CartContext);

    return (
        <div className="cart">
            <Cart2 width={30} height={30}/>
            <p>0</p>
        </div>
    );
}

export default Cart;
