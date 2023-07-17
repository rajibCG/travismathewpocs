import { createSlice } from '@reduxjs/toolkit';

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
            state.itemCount = state.itemListing.length
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

});

export const { setCartCount, setCartItems, setCartToken, setCartGuid, setCartUserEmail, setCartLoader } = cartSlice.actions;
export const selectCartCount = (state) => state.cart.itemCount;
export const selectCartLoader = (state) => state.cart.loader;
export const selectCartItems = (state) => state.cart.itemListing;

export default cartSlice.reducer;
