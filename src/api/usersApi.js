import axios from "axios";
import { authHeader } from "./auth-header";

const BASE_URL = "http://localhost:8080";

export const getAllUsers = async () => {
    const response = await axios.get(`${BASE_URL}/api/users`, { headers: authHeader() });
    return response.data;
};
