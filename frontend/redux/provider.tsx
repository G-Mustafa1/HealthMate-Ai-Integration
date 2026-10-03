"use client";

import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";

import { AppDispatch, store } from "./store";
import { getUser } from "./features/auth/authThunks";
interface ReduxProviderProps {
    children: React.ReactNode;
}

function AuthInitializer({
    children,
}: ReduxProviderProps) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return <>{children}</>;
}

export default function ReduxProvider({
    children,
}: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <AuthInitializer>
                {children}
            </AuthInitializer>
        </Provider>
    );
}