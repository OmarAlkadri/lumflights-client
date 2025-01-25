import { IUser } from "@/contexts/AuthContext";
import axios from "axios";

const API_LOGIN_URL = "http://localhost:3030/auth/login";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface UserResponse { access_token: string, user: IUser }

export const login = async (credentials: LoginCredentials): Promise<UserResponse> => {
    try {
        const response = await axios.post(API_LOGIN_URL, credentials, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            return response.data as UserResponse;
        } else {
            throw new Error("Failed to login. Please check your credentials.");
        }
    } catch (error: any) {
        console.error("Login error:", error.message || error);
        throw new Error(error.response?.data?.message || "An unexpected error occurred.");
    }
};
