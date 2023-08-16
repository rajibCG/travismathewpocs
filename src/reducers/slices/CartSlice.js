import configuration from '@/constants/configuration';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    itemCount: 0,
    loader: false,
    token: null,
    guid: null,
    useremail: null,
    itemListing: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartCount(state, action) {
            state.itemCount += action.payload;
        },
        setCartItems(state, action) {
            state.itemListing = action.payload;
            state.itemCount = action.payload ? state.itemListing.length : state.itemCount
        },
        setCartToken(state, action) {
            state.token = action.payload;
        },
        setCartGuid(state, action) {
            state.guid = action.payload;
        },
        setCartUserEmail(state, action) {
            state.useremail = action.payload;
        },
        setCartLoader(state, action) {
            state.loader = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartData.fulfilled, (state, { payload }) => {
            if (payload.resp.status === 200) {
                const { totalItems, entries } = payload.resp.response
                state.guid = payload.CartGuid
                state.itemCount = totalItems ? totalItems : state.itemCount
                state.itemListing = entries && entries.length > 0 ? entries : state.itemListing
            }
        })
    }
});

export const fetchCartData = createAsyncThunk('fetchCartData', async (param, { getState }) => {
    const cardBody = new URLSearchParams();
    const access_token = localStorage.getItem(configuration.hybrisTokenCookieName)
    const userEmail = getState().cart.useremail
    cardBody.append("usertype", Cookies.get(configuration.userTypeCookieName));
    cardBody.append("user", getState().cart.useremail);
    cardBody.append("token", access_token);
    cardBody.append("guid", Cookies.get(configuration.cartCookieName));
    cardBody.append("userGuid", Cookies.get(configuration.cartCookieGuiName));
    const resp = await fetch(`/api/occ/cart?${cardBody.toString()}`, { method: 'GET' })
        .then(res => res.json())

    const CartGuid = userEmail !== configuration.guestUserName ? resp?.response?.code : resp?.response?.guid;

    Cookies.set(configuration.cartCookieGuiName, resp?.response?.guid, {
        expires: 7,
    })
    if (CartGuid) {
        Cookies.set(configuration.cartCookieName, CartGuid, {
            expires: 7,
        })
    }
    // console.log(CartGuid)
    return {
        resp,
        CartGuid
    };
})



export const { setCartCount, setCartItems, setCartToken, setCartGuid, setCartUserEmail, setCartLoader } = cartSlice.actions;
export const selectCartCount = (state) => state.cart.itemCount;
export const selectCartLoader = (state) => state.cart.loader;
export const selectCartItems = (state) => state.cart.itemListing;

export default cartSlice.reducer;
