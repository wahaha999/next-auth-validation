"use client";
import React, { useContext, createContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}): React.ReactElement => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const loginUser = () => {
    console.log("login User!!!!");
    setAuthenticated(true);
  };

  const logoutUser = () => {
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};
