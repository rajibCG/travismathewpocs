"use client";

import { selectCartCount } from '@/reducers/slices/CartSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MiniCart from './MiniCart';

function Cart() {
    const [cartFetchReq, setCartFetchReq] = useState(false)
    const [showMiniCart, setShowMiniCart] = useState(false)
    const cartItem = useSelector(selectCartCount)
    const cartData = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const fetchCartData = async () => {
        // if (cartFetchReq) {
        //     return false;
        // }
        //setCartFetchReq(true)
        dispatch(fetchCartData()).then(res => {
            setCartFetchReq(false)
        })

    }

    const hideMiniPopUp = () => {
        setShowMiniCart(false)
    }

    return (
        <div>
            <button type='button' onMouseOver={fetchCartData}>cart
                <span>({cartItem})</span>
            </button>
            {showMiniCart && <MiniCart closeAction={hideMiniPopUp} />}
        </div>
    );
}

export default Cart;