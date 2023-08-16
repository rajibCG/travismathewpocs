"use client";

import Loader from "@/components/Sitewide/ButtonLoader/Loader";
import { clearMsg, errorMsg, successMsg } from "@/lib/Notification";
import { fetchCartData, setCartItems, setCartLoader } from "@/reducers/slices/CartSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PDPColorList from "../PDPProductConfigurationForm/PDPColorList";

const PDPProductDetails = ({ productId, producturl, title, price, bloomreachData, hybrisData }) => {
    // console.log(hybrisData)
    const params = useParams()
    const dispatch = useDispatch()
    const cartData = useSelector(state => state.cart)
    const siteLang = "en-US";
    const productCode = params.id;
    const productSizing = bloomreachData?.facet_counts?.facet_fields?.Sizes
    const productColors = hybrisData?.baseOptions[0]?.options
    const selectedproductColorCode = hybrisData?.baseOptions[0]?.selected?.code
    const selectedSize = productCode.substring(productId.length)
    const description = hybrisData?.description


    const sizeList = productSizing?.map((size, i) => (
        <li key={i} className="col-span-1 pdp-product-details-w2">
            <Link href={producturl + size.name} disabled={selectedSize === size.name} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">{size.name}</Link>
        </li>
    ));
    const colorList = productColors?.map((colorOption, i) => (
        <PDPColorList key={i} option={colorOption} sizeOption={selectedSize} selected={selectedproductColorCode} />
    ));

    const checkTheProductHasInCart = () => {
        for (let i = 0; i < cartData.itemListing.length; i++) {
            const entry = cartData.itemListing[i]

            if (entry.product.code === productCode) {
                return {
                    status: true,
                    entryNumber: i,
                    quantity: entry.quantity
                };
            }
        }
        return {
            status: false,
            entryNumber: null,
            quantity: 0
        };
    }

    const addToCart = async () => {
        const { status, entryNumber, quantity } = checkTheProductHasInCart()
        dispatch(setCartLoader(true))
        clearMsg()
        const productToAdd = {
            code: productCode,
            name: title,
            price: {
                currencyIso: "USD",
                value: price,
            },
            product: {
                code: productCode,
            },
            // promotionPrice: {
            //     currencyIso: "USD",
            //     value: 0,
            // },
            purchasable: true,
            stock: {},
            url: producturl,
            quantity: quantity + 1
        };
        // dispatch(setCartItems([productToAdd]))
        const response = await fetch('/api/occ/cart', {
            method: status ? 'PATCH' : 'POST',
            body: JSON.stringify({
                user: cartData.useremail,
                token: cartData.token,
                guid: cartData.guid,
                product: productToAdd,
                entryNumber
            })
        }).then(res => res.json())
        if (response.result.status === 200) {
            dispatch(fetchCartData())
            successMsg('Product added to cart successfully.')
        } else {
            errorMsg(response.errorMsg ? response.errorMsg : 'Please try agin later.Something went wrong.')
        }
        dispatch(setCartLoader(false))
    }
    //sizeAndFitDescription
    return (
        <>
            <div className="pdp-product-details">
                <h1>{title}</h1>
                {siteLang == "en-US" ? <h3>${price}</h3> : <h3>C${price}</h3>}
                <div className="product-size py-5 ">
                    <ul className="grid gap-5 grid-cols-5 pdp-product-details-w1">
                        {colorList}
                    </ul>
                </div>
                <div className="product-size py-5 ">
                    <ul className="grid gap-5 grid-cols-5 pdp-product-details-w1">
                        {sizeList}
                    </ul>
                </div>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                <div className="pt-5">

                    <button type="button"
                        onClick={addToCart}
                        disabled={cartData.loader ? true : false}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> {cartData.loader ? <Loader /> : 'Add To Cart'}</button>

                </div>
            </div>
        </>
    );
};
export default PDPProductDetails;
