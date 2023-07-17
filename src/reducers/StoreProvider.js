"use client";

import Store from "@/store/Store";
import { Provider } from "react-redux";

export default function StoreProvider({ children }) {
    return <Provider store={Store}>{children}</Provider>;
}
