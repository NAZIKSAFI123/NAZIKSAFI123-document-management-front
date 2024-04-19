import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUserDocuments } from "../api/documentsApi";
import DocumentList from "./DocumentList";
import Pagination from "./Pagination";

const UserDocuments = ({ userId }) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);

  const { data, isLoading, isError, error } = useQuery(
    ["userDocuments", page, size, userId],
    () => getUserDocuments(userId, page, size),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Documents</h2>
      <DocumentList
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      {data && (
        <Pagination
          page={data?.pageable.pageNumber || 1}
          totalPages={data?.totalPages || 1}
          setPage={setPage}
          setSize={setSize}
          totalElements={data?.totalElements || 0}
          size={size}
        />
      )}
    </div>
  );
};

export default UserDocuments;
