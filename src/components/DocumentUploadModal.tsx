import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addDocument } from "../api/documentsApi";
import { alertError, alertSuccess } from "../libs/notification";
import FileUploader from "./FileUploader";
import Modal from "./Modal";

function DocumentUploadModal({ isOpen, onClose }) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [newDocument, setNewDocument] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDocument((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const { mutate, isLoading } = useMutation(addDocument, {
    onSuccess: () => {
      alertSuccess("Document uploaded successfully!");
      onClose();
      queryClient.invalidateQueries("documents");
    },
    onError: () => {
      alertError("Failed to upload document. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ newDocument, file });
  };

  return (
    <Modal title={"Upload New Document"} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newDocument.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={newDocument.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* File upload input */}
        <FileUploader
          onFileChange={handleFileChange}
          isSubmitted={isLoading}
          resetSubmit={() => setFile(null)}
        />

        {/* Submit button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none"
          >
            {isLoading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default DocumentUploadModal;
