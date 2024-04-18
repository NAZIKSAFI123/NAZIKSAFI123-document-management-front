import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getAllDocuments = async (
    page = 1,
    size = 5,
    sortDirection = "asc",
    sortBy = "name"
) => {
    const response = await axios.get(
        `${BASE_URL}/api/documents?page=${page}&size=${size}&sortDirection=${sortDirection}&sortBy=${sortBy}`
    );
    return response.data;
};


export const getDocumentById = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/documents/${id}`);
    return response.data;
};
export const deleteDocument = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/documents/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error; }
};


export const searchDocuments = async (keyword, date = null, page = 1, size = 5) => {
    const response = await axios.get(`${BASE_URL}/api/documents/search`, {
        params: { keyword, date, page, size },
    });
    return response.data;
};
