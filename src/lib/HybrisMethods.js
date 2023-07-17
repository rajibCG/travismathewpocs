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
                headers: { Authorization: "Bearer " + token },
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

export const retriveCart = async (user, token) => {
    const baseUrl = process.env.APP_HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    try {
        const ress = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts?fields=DEFAULT`,
            {
                headers: { Authorization: "Bearer " + token },
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

export const retriveCartWithIdentifier = async (user, cardId, token) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    try {
        const ress = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts/${cardId}?fields=DEFAULT`,
            {
                headers: { Authorization: "Bearer " + token },
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

export const AddProductToCart = async ({ user, cardId, token, product }) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    // console.log(product)
    try {
        const res = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts/${cardId}/entries?fields=DEFAULT`,
            {
                headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
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


export const getCartEntries = async ({ user, cardId, token }) => {
    const baseUrl = process.env.HYBRIS_API_URL
    const baseSiteIdentifier = process.env.HYBRIS_BASE_SITE_IDENTIFIER
    try {
        const ress = await fetch(
            `${baseUrl}/restv2/v2/${baseSiteIdentifier}/users/${user}/carts/${cardId}/entries?fields=DEFAULT`,
            {
                headers: { Authorization: "Bearer " + token },
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

