import axios from "axios";
import { authHeader } from "./auth-header"; // Import the authHeader function

const BASE_URL = "http://localhost:8080";

export const getAllDocuments = async (
    page = 1,
    size = 5,
    sortDirection = "asc",
    sortBy = "name"
) => {
    const response = await axios.get(
        `${BASE_URL}/api/documents?page=${page}&size=${size}&sortDirection=${sortDirection}&sortBy=${sortBy}`,
        { headers: authHeader() }
    );
    return response.data;
};

export const getDocumentById = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/documents/${id}`, { headers: authHeader() });
    return response.data;
};

export const deleteDocument = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/documents/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
};

export const searchDocuments = async (keyword, date = null, page = 1, size = 5) => {
    const response = await axios.get(`${BASE_URL}/api/documents/search`, {
        params: { keyword, date, page, size },
        headers: authHeader()
    });
    return response.data;
};

export const addDocument = async ({ newDocument, file }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", newDocument.name);
    formData.append("type", newDocument.type);
    formData.append("description", newDocument.description);

    const config = {
        headers: {
            "content-type": "multipart/form-data",
            ...authHeader()
        },
    };

    const response = await axios.post(`${BASE_URL}/api/documents`, formData, config);
    return response.data;
};
