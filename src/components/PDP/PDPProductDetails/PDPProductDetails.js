"use client";

import Loader from "@/components/Sitewide/ButtonLoader/Loader";
import { clearMsg, errorMsg } from "@/lib/Notification";
import { setCartCount, setCartItems, setCartLoader } from "@/reducers/slices/CartSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PDPColorList from "../PDPProductConfigurationForm/PDPColorList";

const PDPProductDetails = ({ productId, producturl, title, price, bloomreachData, hybrisData }) => {
    console.log(hybrisData)
    const params = useParams()
    const dispatch = useDispatch()
    const cartData = useSelector(state => state.cart)
    const siteLang = "en-US";
    const productSizing = bloomreachData?.facet_counts?.facet_fields?.Sizes
    const productColors = hybrisData?.baseOptions[0]?.options
    const selectedproductColorCode = hybrisData?.baseOptions[0]?.selected?.code
    const selectedSize = params.id.substring(productId.length)
    const description = hybrisData?.description

    const sizeList = productSizing?.map((size, i) => (
        <li key={i} className="col-span-1 pdp-product-details-w2">
            <Link href={producturl + size.name} disabled={selectedSize === size.name} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">{size.name}</Link>
        </li>
    ));
    const colorList = productColors?.map((colorOption, i) => (
        <PDPColorList key={i} option={colorOption} selected={selectedproductColorCode} />
    ));

    const addToCart = async () => {
        dispatch(setCartLoader(true))
        clearMsg()
        const productToAdd = {
            code: productId,
            name: title,
            price: {
                currencyIso: "USD",
                value: price,
            },
            product: {
                code: productId,
            },
            promotionPrice: {
                currencyIso: "USD",
                value: 0,
            },
            purchasable: true,
            stock: {},
            url: producturl,
        };
        dispatch(setCartItems([productToAdd]))
        // const result = await fetch('/api/occ/cart', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         user: cartData.useremail,
        //         token: cartData.token,
        //         guid: cartData.guid,
        //         product: productToAdd
        //     })
        // }).then(res => res.json())
        // if (result.status === 200) {
        //     dispatch(setCartItems([productToAdd]))
        // } else {
        //     errorMsg(result.errorMsg ? result.errorMsg : 'Please try agin later.Something went wrong.')
        // }
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
