import { IUser } from "@/contexts/AuthContext";
import apiClient from "@/utils/apiClient";
import axios, { AxiosError } from "axios";


export interface LoginCredentials {
    email: string;
    password: string;
}

export interface UserResponse {
    access_token: string;
    user: IUser;
}

export const login = async (credentials: LoginCredentials): Promise<UserResponse> => {
    try {
        const response = await apiClient.post('auth/login', credentials);

        if (response.status === 200) {
            return response.data as UserResponse;
        } else {
            throw new Error("Failed to login. Please check your credentials.");
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific error
            const axiosError = error as AxiosError;
            console.error("Login error:", axiosError.message);
            throw new Error(axiosError.message || "An unexpected error occurred.");
        } else if (error instanceof Error) {
            // Handle generic error
            console.error("Login error:", error.message);
            throw new Error(error.message || "An unexpected error occurred.");
        } else {
            // Handle unknown error type
            console.error("Login error: An unexpected error occurred.");
            throw new Error("An unexpected error occurred.");
        }
    }
};