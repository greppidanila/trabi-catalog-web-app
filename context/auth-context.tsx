"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "public" | "librero";

export type User = {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLibrero: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock librero credentials for demo
const MOCK_LIBREROS = [
  { 
    id: "1", 
    email: "librero@trabi.com", 
    password: "trabi2026", 
    name: "Juan Pérez",
    businessName: "Librería El Sol",
    role: "librero" as UserRole
  },
  { 
    id: "2", 
    email: "mayorista@test.com", 
    password: "mayorista123", 
    name: "María García",
    businessName: "Distribuidora García",
    role: "librero" as UserRole
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("trabi_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("trabi_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const foundUser = MOCK_LIBREROS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        businessName: foundUser.businessName,
        role: foundUser.role,
      };
      setUser(userData);
      localStorage.setItem("trabi_user", JSON.stringify(userData));
      setIsLoading(false);
      setShowLoginModal(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("trabi_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLibrero: user?.role === "librero",
        login,
        logout,
        isLoading,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
