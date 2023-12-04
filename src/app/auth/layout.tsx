import React from 'react'

interface PropsType {
    children: React.ReactNode;
}

const AuthLayout = ({children}: PropsType) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            {children}
        </div>
    )
}

export default AuthLayout