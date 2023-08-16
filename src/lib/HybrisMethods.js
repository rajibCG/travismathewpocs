export const fetchHybrisClientToken = async () => {
    const tokenData = new URLSearchParams();
    tokenData.append("client_id", process.env.HYBRIS_CLIENT_ID);
    tokenData.append("client_secret", process.env.HYBRIS_CLIENT_SECRET);
    tokenData.append("grant_type", "client_credentials");

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            grant_type: "client_credentials",
        },
        grant_type: "client_credentials",
        body: tokenData.toString(),
    };
    try {
        const res = await fetch(
            `${process.env.HYBRIS_API_URL}/authorizationserver/oauth/token`,
            fetchOptions
        );
        const tokenResponse = await res.json();
        return {
            status: 200,
            response: tokenResponse
        }
    } catch (ex) {
        return {
            status: 400,
            response: ex.message || 'Error in fetching'
        }
    }

}

export const createCart = async (user, token) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    try {
        const cartResponse = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts?fields=DEFAULT`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST'
            }
        ).then(res => res.json()); ///fetch user cart
        return {
            status: 200,
            response: cartResponse
        }
    } catch (ex) {
        return {
            status: 400,
            response: ex.message || 'Error in fetching'
        }
    }
}

export const mergeCart = async (user, token, oldCartId, toMergeCartGuid) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    try {
        const cartResponse = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts?fields=DEFAULT`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify({
                    oldCartId,//Anonymous cart GUID.
                    toMergeCartGuid //The GUID of the user's cart
                })
            }
        ).then(res => res.json()); ///fetch user cart
        if (cartResponse.errors) {
            return {
                status: 404,
                response: cartResponse
            }
        } else {
            return {
                status: 200,
                response: cartResponse
            }
        }
    } catch (ex) {
        return {
            status: 400,
            response: ex.message || 'Error in fetching'
        }
    }
}


export const retriveCart = async (user, token) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    try {
        const ress = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts?fields=DEFAULT`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'GET'
            }
        ).then(res => res.json());

        if (ress.errors) {
            return {
                status: 404,
                response: ress
            }
        } else {
            return {
                status: 200,
                response: ress
            }
        }

    } catch (ex) {
        return {
            status: 400,
            response: ex.message || 'Error in fetching'
        }
    }
}

export const retriveCartWithIdentifier = async (user, cardId, token) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    try {
        const ress = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts/${cardId}?fields=DEFAULT`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'GET'
            }
        ).then(res => res.json());
        if (ress.errors) {
            return {
                status: 404,
                response: ress
            }
        } else {
            return {
                status: 200,
                response: ress
            }
        }

    } catch (ex) {
        return {
            status: 400,
            response: ex.message || 'Error in fetching'
        }
    }
}

export const AddProductToCart = async ({ user, cardId, token, product }) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    // console.log(product)
    try {
        const res = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts/${cardId}/entries?fields=DEFAULT`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(product)
            }
        ).then(res => res.json());
        if (res.errors) {
            return {
                status: 400,
                errorMsg: res?.errors[0]?.type === "InsufficientStockError" ? 'Product cannot be shipped - out of stock online' : 'Please try agin later.Something went wrong.',
                response: res
            }
        } else {
            return {
                status: 200,
                response: res
            }
        }

    } catch (ex) {
        return {
            status: 400,
            response: ex.message || 'Error in fetching'
        }
    }
}


export const UpdateProductQtyToCart = async ({ user, cardId, token, product, entryNumber }) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER

    try {
        const res = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts/${cardId}/entries/${entryNumber}?fields=DEFAULT`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'PATCH',
                body: JSON.stringify(product)
            }
        ).then(res => res.json());
        if (res.errors) {
            return {
                status: 400,
                errorMsg: res?.errors[0]?.type === "InsufficientStockError" ? 'Product cannot be shipped - out of stock online' : 'Please try agin later.Something went wrong.',
                response: res
            }
        } else {
            return {
                status: 200,
                response: res
            }
        }

    } catch (ex) {
        return {
            status: 400,
            response: ex.message || 'Error in fetching'
        }
    }
}

export const getCartEntries = async ({ user, cardId, token }) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    try {
        const ress = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts/${cardId}/entries?fields=DEFAULT`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'GET'
            }
        ).then(res => res.json());

        return {
            status: 200,
            response: ress
        }
    } catch (ex) {
        return {
            status: 400,
            response: ex.message || 'Error in fetching'
        }
    }

}

