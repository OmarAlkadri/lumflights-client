"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, LoginCredentials, UserResponse } from "@/app/api/auth/login";
import { logout as apiLogout } from "@/app/api/auth/logout";
import { useRouter } from "next/navigation";

export interface IUser {
    _id: any;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    registrationNumber?: string;

    dateOfBirth?: Date;

    phoneNumber?: string;
    EMaritalStatus?: EMaritalStatus;

    lastLogin?: Date;
    lastNotificationSeen?: Date;

    ERoles?: ERoles[];
    EUserType: ERoles;


    createdAt: Date;
    updatedAt: Date;
    access_token?: string
}

export enum EMaritalStatus {
    Married = 1,
    Single,
}


export enum ERoles {
    Admin = "admin",
    Manager = "manager",
    Field = "staff",
    Employee = "employee",
    Supervisor = "supervisor",
}

type AuthContextType = {
    user: IUser | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    hasRole: (role: ERoles) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const userData: UserResponse = await apiLogin(credentials);

            const transformedUser: IUser = {
                _id: userData.user._id,
                firstName: userData.user.firstName,
                lastName: userData.user.lastName,
                email: userData.user.email,
                ERoles: userData.user.ERoles || [],
                EUserType: userData.user.EUserType,
                phoneNumber: userData.user.phoneNumber,
                access_token: userData.access_token,
                password: "",
                createdAt: userData.user.createdAt,
                updatedAt: userData.user.updatedAt
            };

            setUser(transformedUser);
            localStorage.setItem("user", JSON.stringify(transformedUser));
            localStorage.setItem("authToken", userData.access_token);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Login failed:", error.message);
                throw error;
            } else {
                console.error("Unexpected error:", error);
                throw new Error("An unexpected error occurred.");
            }
        }
    };

    const logout = () => {
        try {
            apiLogout();
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            router.push("http://localhost:3000");
        } catch (error) {
            if (error instanceof Error) {
                console.error("Login failed:", error.message);
                throw error;
            } else {
                console.error("Unexpected error:", error);
                throw new Error("An unexpected error occurred.");
            }
        }
    };

    const hasRole = (role: ERoles): boolean => {
        return user?.ERoles?.includes(role) ?? false;
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
