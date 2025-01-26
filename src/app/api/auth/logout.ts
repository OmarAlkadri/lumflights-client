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
    } catch {
        throw new Error("An unexpected error occurred.");
    }
};

