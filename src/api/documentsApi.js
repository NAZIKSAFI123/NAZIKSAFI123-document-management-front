import axios from "axios";
import { alertError } from "../libs/notification";
import { authHeader } from "./auth-header";
import { getUser } from "./authStorage";

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

export const getDocumentById = async (documentId, userId) => {
  const response = await axios.get(`${BASE_URL}/api/documents/${documentId}?userId=${userId}`, {
    headers: authHeader(),
  });
  return response.data;
};


export const deleteDocument = async (documentId, userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/documents/${documentId}?userId=${userId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};


export const searchDocuments = async (
  keyword,
  date = null,
  page = 1,
  size = 5
) => {
  const response = await axios.get(`${BASE_URL}/api/documents/search`, {
    params: { keyword, date, page, size },
    headers: authHeader(),
  });
  return response.data;
};

export const addDocument = async ({ newDocument, file }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", newDocument.name);
  formData.append("type", newDocument.type);
  formData.append("description", newDocument.description);

  // Get the user id from the authentication storage
  const user = getUser();
  const userId = user.id;

  // Append the user id to the form data
  formData.append("userId", userId);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
  };

  const response = await axios.post(
    `${BASE_URL}/api/documents`,
    formData,
    config
  );
  return response.data;
};

export const shareDocumentWithUser = async ({
  documentId,
  userId,
  permission,
}) => {
  try {

    const formData = new FormData();
    formData.append("documentId", documentId);
    formData.append("userId", userId);
    formData.append("permission", permission);
    const response = await axios.post(`${BASE_URL}/api/sh`, formData);
    return response.data;
  } catch (error) {
    console.error("Error sharing document with user:", error);
    throw error;
  }
};

export const getUserDocuments = async (userId, page = 1, size = 5) => {
  const response = await axios.get(
    `${BASE_URL}/api/documents/user?page=${page}&size=${size}&userId=${userId}`,
    { headers: authHeader() }
  );
  return response.data;
};
export const getUsersWithPermissions = async (documentId) => {
  const response = await axios.get(`${BASE_URL}/api/sh/${documentId}`, {
    headers: authHeader(),
  });
  console.log(response);
  return response.data;
};

export const downloadFile = async (documentData, documentId, userId) => {
  try {
    console.log("Downloading file with params:", { documentId, userId });

    const response = await fetch(`${documentData.storageLocation}?documentId=${documentId}&userId=${userId}`, {
      headers: authHeader(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", documentData.name);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  } catch (error) {
    alertError("Error downloading document:", error);
  }
};
