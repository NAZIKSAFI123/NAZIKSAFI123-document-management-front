import React from "react";

function Pagination({ page, totalPages, setPage }) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex justify-center">
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
                className={`page-link relative block py-1.5 px-3  border-0  outline-none transition-all duration-600 rounded ${
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
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-300 focus:shadow-none"
              onClick={() => handlePageChange(page + 2)}
              disabled={page === totalPages - 1}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
