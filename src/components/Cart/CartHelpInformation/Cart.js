"use client";

import { selectCartCount, setCartCount, setCartGuid, setCartItems } from '@/reducers/slices/CartSlice';
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
        if (cartFetchReq) {
            return false;
        }
        setCartFetchReq(true)
        const cardBody = new URLSearchParams();
        cardBody.append("user", cartData.useremail);
        cardBody.append("token", cartData.token);
        cardBody.append("guid", cartData.guid);
        const resp = await fetch(`/api/occ/cart?${cardBody.toString()}`, { method: 'GET' })
            .then(res => res.json())
        if (resp.response) {
            const { totalItem, entries } = resp.response
            dispatch(setCartCount(totalItem))
            dispatch(setCartItems(entries))
        }
        //setShowMiniCart(true)
        setCartFetchReq(false)
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