import { cartSlice } from "@/reducers/slices/CartSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        [cartSlice.name]: cartSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

