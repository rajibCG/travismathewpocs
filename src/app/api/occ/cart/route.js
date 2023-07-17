import { NextResponse } from 'next/server'
import { AddProductToCart, createCart, retriveCart, retriveCartWithIdentifier } from '@/lib/HybrisMethods'
import configuration from '@/constants/configuration';

export async function GET(request) {
    let result = {
        status: 200,
        response: null
    };
    let resp = result

    const search = new URL(request.url).search;
    const urlParams = new URLSearchParams(search);
    const user = urlParams.get('user')
    const guid = urlParams.get('guid')
    const token = urlParams.get('token')
    if (guid) {
        result = await retriveCartWithIdentifier(user, guid, token)
    } else {
        if (user !== configuration.guestUserName) {
            result = await retriveCart(user, token)
        } else {
            result.status = 400;
        }
    }
    if (result.status === 200 && !result.response.errors) {
        if (result.response.cart) {
            resp.response = result.response.cart[0]
        } else {
            resp.response = result.response
        }
    } else if (result.status === 400) {
        resp = await createCart(user, token)
    } else if (result.response.errors) {
        resp.status = 400;
    }
    return NextResponse.json(resp)
}


export async function POST(request) {
    const data = await request.json();
    // const productdata = {
    //     "entryNumber": 0,
    //     "product": {
    //         "availableForPickup": true,
    //         "averageRating": 0,
    //         "code": "1MU428_4VBK_",
    //         "configurable": true,
    //         "name": "Splatter Print Polo",
    //         "price": {
    //             "currencyIso": "USD",
    //             "priceType": "BUY",
    //             "value": 99.95
    //         },
    //         "purchasable": true,
    //         "stock": {
    //             "isValueRounded": true,
    //             "stockLevel": 0
    //         },
    //         "url": "/TM/NEW/New-Arrivals/RESPITE/p/1MT058_0HGP_M"
    //     },
    //     "quantity": 1,
    //     "updateable": true,
    //     "url": "/TM/NEW/New-Arrivals/RESPITE/p/1MT058_0HGP_M"
    // }
    const result = await AddProductToCart({
        user: data.user,
        cardId: data.guid,
        token: data.token,
        product: data.product
    })
    return NextResponse.json(result)
}