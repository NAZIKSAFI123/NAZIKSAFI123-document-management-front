import React, { useEffect, useState } from "react";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getUser } from "../api/authStorage";
import UserDocuments from "../components/UserDocuments";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(getUser());
  const [file, setFile] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Retrieve user data from local storage
  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);
  }, []);

  const handleFileChange = async (selectedFile) => {
    setFile(selectedFile);
  };

  const updatePhoto = async () => {
    // Placeholder function for updating photo
    console.log("Update photo functionality will be implemented later");
    // Reset FileUploader state
    setIsSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
      {/* First part */}
      <div>
        {/* Card for user photo */}
        <div className="bg-white border shadow-md rounded-lg overflow-hidden mx-auto p-4">
          <div className="flex gap-2 h-full p-1 border-2 border-dashed border-gray-400 rounded-md items-center ">
            <div className="col-span-3">
              {user?.photoUrl ? (
                <img
                  className="h-32 w-32 object-cover rounded-md"
                  src={user?.photoUrl}
                  alt={user?.name}
                />
              ) : (
                <FaUserCircle className="text-4xl h-24 w-24 mx-4 text-gray-600" />
              )}
            </div>
            <div className="col-span-9 flex flex-col w-full m-2 p-2 text-center">
              <h2 className="text-md font-semibold">{user?.name}</h2>
              {/* Placeholder text for file uploader */}
              <p className="text-gray-600">File uploader will be here</p>
              <button
                onClick={updatePhoto}
                className="flex gap-1 bg-gray-200 text-gray-700 rounded-lg p-1 text-center justify-center items-center font-semibold hover:bg-gray-300"
              >
                Update photo
              </button>
            </div>
          </div>
        </div>

        {/* Card for updating user details */}
        <div className="bg-white border shadow-md rounded-lg overflow-hidden mx-auto p-4 mt-4">
          <h2 className="text-lg font-semibold mb-4">Update User Details</h2>
          <form>
            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  value={user?.name}
                  className="text-gray-800 px-3 py-2 border rounded-md w-full"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  className="text-gray-800 px-3 py-2 border rounded-md w-full"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  value={user?.username}
                  className="text-gray-800 px-3 py-2 border rounded-md w-full"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Role
                </label>
                <input
                  type="text"
                  value={user?.role}
                  className="text-gray-800 px-3 py-2 border rounded-md w-full"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Created At
                </label>
                <input
                  type="text"
                  value={user?.createTime}
                  className="text-gray-800 px-3 py-2 border rounded-md w-full"
                  readOnly
                />
              </div>
            </div>
            <div className="mt-4 w-1/3 ">
              <button
                type="submit"
                className="flex gap-2 items-center justify-center w-full px-4 py-2 border border-gray-700 text-gray-700 rounded-md hover:bg-gray-500 hover:text-white focus:outline-none"
              >
                <FaEdit className="" /> Update details
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Second part (empty card) */}
      <div className="bg-white border shadow-md rounded-lg overflow-y-scroll w-full mx-auto p-4 ">
        <UserDocuments userId={user?.id} />
      </div>
    </div>
  );
};

export default Profile;
