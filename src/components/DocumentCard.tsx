import React from "react";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import getFileTypeIcon from "../libs/fileUtils";

function DocumentCard({ document }) {
  const fileTypeIcon = getFileTypeIcon(document.type);

  return (
    <Link to={`/document/${document.id}`} className="">
      <div className=" grid my-2 grid-cols-12 gap-4 max-w-screen-lg mx-auto p-4 border-2 rounded-md">
        {/* <div className="absolute top-2 right-4 cursor-pointer transition-transform duration-500 transform hover:scale-110">
          <BsEyeFill className="h-6 w-6 text-neutral-600 hover:text-blue-400" />
        </div> */}

        {/* First Part */}
        <div className="col-span-2 ">
          <img
            className="w-fit h-24 object-cover border p-1 rounded-md"
            src={fileTypeIcon}
            alt="Document Type"
          />
        </div>

        {/* Second Part */}
        <div className="col-span-6 flex flex-col text-start ">
          <div className="font-semibold text-lg mb-2">{document.name}</div>
          <p className="text-gray-700 text-sm mb-2">Type: {document.type}</p>
          <p className="text-gray-700 text-sm">
            Creation Date : {document.creationDate}
          </p>
        </div>

        {/* Third Part */}
        <div className="col-span-4 flex flex-col justify-center">
          {/* Add meta data here */}
          <div className="flex items-center text-xs font-bold mb-2 ">
            <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-md mr-2">
              Extension : {document.metadata.extension}
            </span>
            <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-md">
              Size : {document.metadata.size}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DocumentCard;
