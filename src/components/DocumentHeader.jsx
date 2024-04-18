import React, { useState } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import {
  RiCalendar2Line,
  RiSearch2Line,
  RiUploadCloud2Line,
} from "react-icons/ri";
import DocumentUploadModal from "./DocumentUploadModal";

function DocumentHeader({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleSearch = () => {
    onSearch(keyword, selectedDate || null);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleUpload = () => {
    setIsModalOpen(true); // Open the modal when upload button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-2 px-4 md:px-0">
      {/* Search Input */}
      <div className="flex items-center w-full gap-2">
        <div className="flex rounded-md border border-gray-300 px-2 w-full ">
          <IoOptionsOutline
            size={30}
            className="self-center flex"
            color="#999"
          />
          <input
            type="text"
            className="w-full  flex bg-transparent pl-2  outline-0"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="relative p-2 hover:text-blue-500  rounded-full"
            onClick={handleSearch}
          >
            <RiSearch2Line size={25} color="#999" />
          </button>
        </div>
      </div>

      {/* Date Picker */}
      <div className="flex items-center w-full gap-2">
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <span className="text-gray-500">
          <RiCalendar2Line size={20} />
        </span>
      </div>

      {/* Upload Button */}
      <div className="w-full md:w-fit">
        <button
          className="px-10 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center w-full gap-3"
          onClick={handleUpload}
        >
          <RiUploadCloud2Line size={20} />
          <span>Upload</span>
        </button>
      </div>

      {/* Document Upload Modal */}
      <DocumentUploadModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default DocumentHeader;
