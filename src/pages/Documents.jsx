import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllDocuments, searchDocuments } from "../api/documentsApi";
import DocumentCard from "../components/DocumentCard";
import DocumentHeader from "../components/DocumentHeader";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";

const Documents = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("name");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchDate, setSearchDate] = useState(null);

  const { data, isLoading, isError, error } = useQuery(
    ["documents", page, size, sortDirection, sortBy, searchKeyword, searchDate],
    () => {
      if (searchKeyword) {
        return searchDocuments(searchKeyword, searchDate, page, size);
      } else {
        return getAllDocuments(page, size, sortDirection, sortBy);
      }
    },
    {
      keepPreviousData: true,
    }
  );

  const handleSearch = (keyword, date) => {
    setSearchKeyword(keyword);
    setSearchDate(date);
  };
  const handleAddDocument = () => {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    // Display SweetAlert based on error type
    if (error.response && error.response.status === 404) {
      Swal.fire({
        icon: "error",
        title: "Document Not Found",
        text: "The document you searched for does not exist.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error Fetching Documents",
        text: "An error occurred while fetching documents. Please try again later.",
      });
    }
    return null; // Don't render anything while showing SweetAlert
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <DocumentHeader
        onSearch={handleSearch}
        onAddDocument={handleAddDocument}
      />

      <div className="space-y-4">
        {data.content && data.content.length > 0 ? (
          data.content.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))
        ) : (
          <div>No documents found</div>
        )}
      </div>

      <div className="py-4">
        <Pagination
          page={data.pageable.pageNumber}
          totalPages={data.totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Documents;
