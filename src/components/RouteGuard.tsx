'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface PropsType {
    children: React.ReactNode
}

const isBrowser = () => typeof window !== "undefined";

function RouteGuard({ children }: PropsType) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    const publicPath: string[] = ['/login', '/signup'];
    React.useEffect(() => {
        const path = pathname.split('?')[0];
        if (!isAuthenticated && !publicPath.includes(path)) {
            router.push('/login');
        }
    }, [isAuthenticated, pathname, router]);

    return <>{children}</>;
}

export default RouteGuard;