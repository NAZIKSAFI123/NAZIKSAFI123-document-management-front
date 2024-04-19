// authService.js
import axios from "axios";
import { getUser, removeUser, saveUser } from "./authStorage";

const BASE_URL = "http://localhost:8080";


export const isAuthenticated = () => {
    const currentUser = getUser();
    return currentUser && currentUser.token;
};

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/sign-in`, user);
        console.log(response.data);

        if (response.data.token) {
            saveUser(response.data);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/sign-up`, user);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = () => {
    removeUser();
};
