import { useEffect, useState } from "react";
import { BsFiletypeDocx, BsFillPersonVcardFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { ImDownload3 } from "react-icons/im";
import { IoMdShare } from "react-icons/io";
import { IoLinkOutline } from "react-icons/io5";
import { MdDateRange, MdDelete } from "react-icons/md";
import { SiZaim } from "react-icons/si";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/authStorage";
import {
  deleteDocument,
  downloadFile,
  getDocumentById,
} from "../api/documentsApi";
import { getUserById } from "../api/usersApi";
import DocumentShareModal from "../components/DocumentShareModal";
import Spinner from "../components/Spinner";
import TableUsersPemissions from "../components/TableUsersPermissions";
import getFileTypeIcon from "../libs/fileUtils";
import {
  alertError,
  alertSuccess,
  deleteConfirmation,
} from "../libs/notification";

export default function DocumentDetails() {
  const navigate = useNavigate();
  const documentId = window.location.pathname.split("/").pop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [owner, setOwner] = useState(null);

  const {
    data: documentData,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["document", documentId],
    () => getDocumentById(documentId, getUser().id),
    {
      onError: (error) => {
        if (error.response && error.response.status === 403) {
          navigate("/");
          alertError("You don't have permission to read the document.");
        } else {
          alertError("Error fetching document data:", error);
        }
      },
    }
  );

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      if (
        documentData &&
        documentData.metadata &&
        documentData.metadata.owner
      ) {
        try {
          const ownerData = await getUserById(documentData.metadata.owner);
          setOwner(ownerData);
        } catch (error) {
          console.error("Error fetching owner details:", error);
        }
      }
    };
    fetchOwnerDetails();
  }, [documentData]);

  const handleShare = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const { isConfirmed } = await deleteConfirmation();

      if (isConfirmed) {
        await deleteDocument(documentId, getUser().id);
        await alertSuccess("Document deleted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      await alertError("Failed to delete document!");
    }
  };
  const handleDownload = async () => {
    await downloadFile(documentData, documentId, getUser().id);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap w-full max-w-screen-lg">
        <div className="w-full lg:w-4/6 p-4">
          {/* start */}
          <div className="bg-white border rounded-lg p-4 flex flex-col lg:flex-row justify-between items-center">
            {/* Image Section */}
            <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-4">
              <img
                className="w-16 h-16 lg:w-24 lg:h-24 object-cover border p-1 rounded-md"
                src={getFileTypeIcon(documentData.type)}
                alt="Document Type"
              />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col">
                <h2 className="text-lg lg:text-xl font-bold break-words ">
                  {documentData.name}
                </h2>
                <p className="text-gray-500 text-sm break-words">
                  {documentData.type}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-1">
                <button
                  className="border border-blue-300 text-blue-500 hover:text-white hover:bg-blue-300 font-bold py-1 px-3 rounded flex gap-2 items-center"
                  onClick={handleDownload}
                >
                  <ImDownload3 />
                  Download
                </button>
                <button
                  className="border border-red-300 text-red-500 hover:text-white hover:bg-red-300 font-bold py-1 px-3 rounded flex gap-2 items-center"
                  onClick={handleDelete}
                >
                  <MdDelete /> Delete
                </button>
                <button
                  className="border border-green-300 text-green-500 hover:text-white hover:bg-green-300 font-bold py-1 px-3 rounded flex gap-2 items-center"
                  onClick={handleShare}
                >
                  <IoMdShare /> Share
                </button>

                <DocumentShareModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  documentId={documentId}
                />
              </div>
            </div>
          </div>
          {/* end */}
        </div>
        <div className="w-full lg:w-2/6  p-4">
          <div className="bg-white border  rounded-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <div className="border-b border-gray-400 opacity-50 mb-2"></div>
              <p className="text-sm text-gray-600">
                {documentData.description}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/6 p-4">
          <div className="bg-white border  rounded-lg h-150 flex items-center justify-center">
            <div className="p-4 w-full">
              <h3 className="text-lg font-semibold mb-2">Document Details</h3>
              <div className="border-b border-gray-400 opacity-50 mb-6"></div>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex mb-4">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <BsFiletypeDocx />
                    </span>
                    <input
                      type="text"
                      id="name"
                      value={documentData.name}
                      className="rounded-none rounded-r-lg  border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex mb-4">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <SiZaim />
                    </span>
                    <input
                      type="text"
                      id="size"
                      value={
                        documentData.metadata ? documentData.metadata.size : ""
                      }
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Size"
                      disabled
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex mb-4">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <BsFillPersonVcardFill />
                    </span>
                    <input
                      type="text"
                      id="user"
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Last updated by"
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex mb-4">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <MdDateRange />
                    </span>
                    <input
                      type="text"
                      id="datec"
                      value={documentData.creationDate}
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Created at"
                      disabled
                    />
                  </div>
                  <div className="flex mb-4">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <MdDateRange />
                    </span>
                    <input
                      type="text"
                      id="datem"
                      value={documentData.creationDate}
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Modified at"
                      disabled
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex mb-4">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <IoLinkOutline />
                    </span>
                    <input
                      type="text"
                      id="url"
                      value={documentData.storageLocation}
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="URL"
                      disabled
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <textarea
                    type="text"
                    value={documentData?.description}
                    placeholder="Description"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <button
                  type="button"
                  id="theme-toggle"
                  className="flex items-center justify-center px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
                >
                  <FaEdit className="mr-2" />
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/6 p-4">
          <div className="bg-white border rounded-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Document Owner</h3>
              <div className="border-b border-gray-400 opacity-50 mb-2"></div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <td className="py-4 px-6">{owner ? owner.name : "-"}</td>
                  </tr>

                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="col" className="py-3 px-6">
                      username
                    </th>
                    <td className="py-4 px-6">
                      {owner ? owner.username : "-"}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <td className="py-4 px-6">{owner ? owner.email : "-"}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="col" className="py-3 px-6">
                      create Time
                    </th>
                    <td className="py-4 px-6">
                      {owner ? owner.createTime : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <TableUsersPemissions documentId={documentId} />
        </div>
      </div>
    </div>
  );
}
