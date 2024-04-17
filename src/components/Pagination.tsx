import React from "react";

function Pagination({
  page,
  totalPages,
  setPage,
  size,
  totalElements,
  setSize,
}) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPage(1);
    setSize(newSize);
  };

  const startElement = page * size + 1;
  const endElement = Math.min((page + 1) * size, totalElements);

  return (
    <div className="flex justify-between items-center">
      <div>
        Showing {startElement}-{endElement} of {totalElements} results
      </div>
      <div className="flex items-center gap-2">
        <select
          value={size}
          onChange={handlePageSizeChange}
          className="px-2 py-1 border rounded-md"
        >
          <option value={3}>3 per Page</option>
          <option value={10}>10 per Page</option>
          <option value={20}>20 per Page</option>
          <option value={50}>50 per Page</option>
        </select>
        <nav aria-label="Page navigation">
          <ul className="flex list-style-none gap-1.5">
            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
              <button
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-300 focus:shadow-none"
                onClick={() => handlePageChange(page)}
                disabled={page === 0}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages).keys()].map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${page === pageNumber ? "active" : ""}`}
              >
                <button
                  className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-600 rounded ${
                    page === pageNumber
                      ? "text-black bg-blue-500 hover:bg-blue-800"
                      : "text-gray-800 hover:text-gray-800 hover:bg-gray-300"
                  } shadow-md focus:shadow-md`}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                page === totalPages - 1 ? "disabled" : "active"
              }`}
            >
              <button
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-300 focus:shadow-none"
                onClick={() => handlePageChange(page + 2)}
                disabled={page === totalPages - 1}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
