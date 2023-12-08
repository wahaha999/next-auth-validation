'use client';
import React from 'react'
import { AuthProvider } from '@/context/AuthContext'
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

type Props = {
    children: React.ReactNode
}

const AppProvider = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Provider>
    )
}

export default AppProvider