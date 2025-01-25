import apiClient from "@/utils/apiClient";

export const logout = async () => {
    try {
        const response = await apiClient.get('/auth/logout');

        if (response.status === 200) {
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
        } else {
            throw new Error("Failed to logout.");
        }
    } catch (error: any) {
        console.error("Login error:", error.message || error);
        throw new Error(error.response?.data?.message || "An unexpected error occurred.");
    }
};

