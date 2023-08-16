import { NextResponse } from 'next/server'
import { AddProductToCart, UpdateProductQtyToCart, createCart, mergeCart, retriveCart, retriveCartWithIdentifier } from '@/lib/HybrisMethods'
import configuration from '@/constants/configuration';

export async function GET(request) {
    let result = {
        status: 400,
        response: null
    };

    const search = new URL(request.url).search;
    const urlParams = new URLSearchParams(search);
    const usertype = urlParams.get('usertype')
    const user = urlParams.get('user')
    const guid = urlParams.get('guid')
    const token = urlParams.get('token')
    if (guid != null) {
        result = await retriveCartWithIdentifier(user, guid, token)
        console.log(JSON.stringify(result))
    }
    if (result.status !== 200) {
        result = await retriveCart(user, token)
        console.log('retrive', JSON.stringify(result))
        if (result.status !== 200) {
            result = await createCart(user, token)
            console.log('created')
        }
    }
    if (result.status === 200 && !result.response.errors) {
        if (result.response.cart) {
            result.response = result.response.cart[0]
        } else {
            result.response = result.response
        }
    }

    if (usertype === configuration.guestUserName && user !== configuration.guestUserName && guid != null) {
        console.log('merged')
        const mergeCartResponse = await mergeCart(user, token, guid, result.response.guid)
        console.log(mergeCartResponse)
        if (mergeCartResponse.status === 200) {
            result.response = mergeCartResponse.response
        }
    }

    return NextResponse.json(result)
}

export async function GsET(request) {
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
        console.log(JSON.stringify(result))
    } else {
        if (user !== configuration.guestUserName) {
            result = await retriveCart(user, token)
        } else {
            result.status = 404;
        }
    }
    if (result.status === 200 && !result.response.errors) {
        if (result.response.cart) {
            resp.response = result.response.cart[0]
        } else {
            resp.response = result.response
        }
    } else if (result.status === 404) {
        console.log('create')
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
    // const entries = await retriveCartWithIdentifier(data.user, data.guid, data.token)

    return NextResponse.json({ result })
}

export async function PATCH(request) {
    const data = await request.json();
    const result = await UpdateProductQtyToCart({
        user: data.user,
        cardId: data.guid,
        token: data.token,
        product: data.product,
        entryNumber: data.entryNumber
    })
    // const entries = await retriveCartWithIdentifier(data.user, data.guid, data.token)
    return NextResponse.json({ result })
}