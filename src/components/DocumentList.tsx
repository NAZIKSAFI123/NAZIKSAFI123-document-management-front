import React from "react";
import { alertError } from "../libs/notification";
import DocumentCard from "./DocumentCard";

const DocumentList = ({ data, isError, isLoading, error }) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    if (error.response && error.response.status === 404) {
      return <div className="text-center mt-4">No documents found</div>;
    } else {
      alertError(
        "An error occurred while fetching documents. Please try again later."
      );
      return (
        <div className="text-center mt-4">
          {error.response ? error.response.data : "Something went wrong."}
        </div>
      );
    }
  }

  return (
    <div className="space-y-4 py-1">
      {data?.content.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
};

export default DocumentList;
