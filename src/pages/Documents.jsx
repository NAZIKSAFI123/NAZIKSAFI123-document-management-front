import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllDocuments, searchDocuments } from "../api/documentsApi";
import DocumentHeader from "../components/DocumentHeader";
import DocumentList from "../components/DocumentList";
import Pagination from "../components/Pagination";

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

  return (
    <div className="max-w-screen-lg mx-auto">
      <DocumentHeader
        onSearch={handleSearch}
        onAddDocument={handleAddDocument}
      />

      <DocumentList
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      <div className="py-4">
        {data && (
          <Pagination
            page={data.pageable.pageNumber}
            totalPages={data.totalPages}
            setPage={setPage}
            setSize={setSize}
            totalElements={data.totalElements}
            size={size}
          />
        )}
      </div>
    </div>
  );
};

export default Documents;
