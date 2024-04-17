import axios from "axios";
import { useRef } from "react";

const BASE_URL = "http://localhost:8080";

export const useApi = () => {
    const axiosInstance = useRef(axios.create({
        baseURL: BASE_URL
    }));

    return axiosInstance;
};
