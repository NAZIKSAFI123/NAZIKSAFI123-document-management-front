import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const FileUploader = ({ onFileChange, isSubmitted, resetSubmit }) => {
  const [file, setFile] = useState(null);
  const [fileStatus, setFileStatus] = useState("");

  useEffect(() => {
    if (isSubmitted) {
      setFile(null);
      setFileStatus("");
      resetSubmit();
    }
  }, [isSubmitted, resetSubmit]);

  const updateFileAndStatus = (selectedFile, status) => {
    setFile(selectedFile?.name || null);
    setFileStatus(status);
    onFileChange(selectedFile);
  };

  const handleFileChanging = (e) => {
    const selectedFile = e.target.files[0];
    const status = selectedFile
      ? "File selected successfully"
      : "Please choose a file";
    updateFileAndStatus(selectedFile, status);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];
    const status = droppedFile
      ? "File dropped successfully"
      : "Please choose a file";

    updateFileAndStatus(droppedFile, status);
  };

  return (
    <div
      className="flex flex-col items-center justify-center space-y-1"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        htmlFor="fileInput"
        className="w-full flex flex-col items-center px-4 py-2 bg-white text-sky-600 border-blue-400 border-2 border-dashed rounded-md shadow-md cursor-pointer hover:bg-blue-100"
      >
        <FaCloudUploadAlt className="w-6 h-6" />
        <span className="mt-2 text-xs font-semibold text-center leading-normal">
          Choose or Drag a file
        </span>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChanging}
          className="hidden"
          aria-describedby="fileInputDesc"
        />
      </label>
      <span
        id="fileInputDesc"
        className={`text-xs text-gray-600 ${file ? "mt-1" : "hidden"}`}
      >
        {file && "File Name : " + file}
      </span>
      <div
        className={`text-xs ${
          fileStatus.includes("successfully")
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {fileStatus}
      </div>
    </div>
  );
};

export default FileUploader;
