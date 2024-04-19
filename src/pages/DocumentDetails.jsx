import { useEffect, useState } from "react";
import { BsFiletypeDocx, BsFillPersonVcardFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { SiZaim } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { deleteDocument, getDocumentById } from "../api/documentsApi";
import { getAllUsers } from "../api/usersApi";
import getFileTypeIcon from "../libs/fileUtils";
import {
  alertError,
  alertSuccess,
  deleteConfirmation,
} from "../libs/notification";

export default function DocumentDetails() {
  const navigate = useNavigate();

  const [documentData, setDocumentData] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("read");
  const [showDropdown, setShowDropdown] = useState(false);
  const [users, setUsers] = useState([]);
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handlePermissionChange = (e) => {
    setSelectedPermission(e.target.value);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        alertError(`Error while fetching users  : ${error}`);
      }
    };

    fetchUsers();
  }, []);

  const handleShare = () => {
    console.log(
      "Document partagé avec l'utilisateur :",
      selectedUser,
      " et la permission :",
      selectedPermission
    );
    setSelectedUser("");
    setSelectedPermission("read");
    setShowDropdown(false);
  };
  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const documentId = window.location.pathname.split("/").pop();
        const data = await getDocumentById(documentId);
        console.log(data);
        setDocumentData(data);
      } catch (error) {
        console.error("Error fetching document data:", error);
      }
    };
    fetchDocumentData();
  }, []);

  const handleDelete = async () => {
    try {
      const documentId = window.location.pathname.split("/").pop();
      const { isConfirmed } = await deleteConfirmation();

      if (isConfirmed) {
        await deleteDocument(documentId);
        await alertSuccess("Document deleted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      await alertError("Failed to delete document!");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`${documentData.storageLocation}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", documentData.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap w-full max-w-screen-lg">
        <div className="w-full lg:w-4/6 p-4">
          <div className="bg-white border rounded-lg flex flex-col lg:flex-row items-center justify-between p-8">
            <div className="flex items-center mb-4 lg:mb-0">
              <img
                className="w-fit h-24 object-cover border p-1 rounded-md"
                src={getFileTypeIcon(documentData.type)}
                alt="Document Type"
              />
              <div className="ml-6">
                <h2 className="text-xl font-bold">{documentData.name}</h2>
                <p className="text-gray-500">{documentData.type}</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 lg:mb-0 lg:mr-2"
                onClick={handleDownload}
              >
                Download
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
              {/* Bouton Partager avec menu déroulant pour choisir l'utilisateur et la permission */}
              <div className="relative ml-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Partager
                </button>
                {showDropdown && (
                  <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg">
                    <select
                      className="w-full p-2"
                      onChange={handleUserChange}
                      value={selectedUser}
                    >
                      <option value="">Sélectionner un utilisateur</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="w-full p-2"
                      onChange={handlePermissionChange}
                      value={selectedPermission}
                    >
                      <option value="lecture">read</option>
                      <option value="écriture">write</option>
                    </select>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={handleShare}
                    >
                      Partager
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/6  p-4">
          <div className="bg-white border  rounded-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <div className="border-b border-gray-400 opacity-50 mb-2"></div>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vel vestibulum eros. Vestibulum nec mi non ligula lacinia
                vestibulum.
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
                    value={documentData.description}
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
                    <td className="py-4 px-6">Nazik</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <td className="py-4 px-6">nazik@gmail.com</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="col" className="py-3 px-6">
                      Phone
                    </th>
                    <td className="py-4 px-6">0690817264</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="col" className="py-3 px-6">
                      Last Login
                    </th>
                    <td className="py-4 px-6">12/12/2001</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
