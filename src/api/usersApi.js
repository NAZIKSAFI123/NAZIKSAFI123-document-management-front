import axios from "axios";
import { alertError } from "../libs/notification";
import { authHeader } from "./auth-header";

const BASE_URL = "http://localhost:8080";

export const getAllUsers = async () => {
    const response = await axios.get(`${BASE_URL}/api/users`, { headers: authHeader() });
    return response.data;
};



export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/users/${userId}`, { headers: authHeader() });
        console.log(response.data);
        return response.data;
    } catch (error) {
        alertError("Error fetching user by ID:", error);
        throw error;
    }
};