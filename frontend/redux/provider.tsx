"use client";

import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";

import { AppDispatch, store } from "./store";
import { getUser } from "./features/auth/authThunks";

function AuthInitializer() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return null;
}

interface ReduxProviderProps {
    children: React.ReactNode;
}

export default function ReduxProvider({
    children,
}: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <AuthInitializer />
            {children}
        </Provider>
    );
}
