import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import Modal from "./Modal";
import { getAllUsers } from "../api/usersApi";
import { shareDocumentWithUser } from "../api/documentsApi";
import { alertError, alertSuccess } from "../libs/notification";

const Permissions = {
  READ: "READ",
  WRITE: "WRITE",
};

function DocumentShareModal({ isOpen, onClose, documentId }) {
  const queryClient = useQueryClient();
  const [newDocumentShare, setNewDocumentShare] = useState({
    selectedUser: "",
    selectedPermission: Permissions.READ,
  });
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDocumentShare((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate, isLoading } = useMutation(shareDocumentWithUser, {
    onSuccess: () => {
      alertSuccess("Document shared successfully!");
      onClose();
      queryClient.invalidateQueries("documents");
    },
    onError: () => {
      alertError("Failed to share document. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { selectedUser, selectedPermission } = newDocumentShare;
    if (!selectedUser) {
      alertError("Please select a user.");
      return;
    }
    console.log("Document share in method parameters:", {
      documentId: documentId,
      userId: selectedUser,
      permission: selectedPermission,
    });
    mutate({
      documentId: documentId,
      userId: selectedUser,
      permission: selectedPermission,
    });
  };

  return (
    <Modal title={"Share Document"} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="selectedUser" className="block text-sm font-medium text-gray-600">
            User
          </label>
          <select
            id="selectedUser"
            name="selectedUser"
            value={newDocumentShare.selectedUser}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="selectedPermission" className="block text-sm font-medium text-gray-600">
            Permission
          </label>
          <select
            id="selectedPermission"
            name="selectedPermission"
            value={newDocumentShare.selectedPermission}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value={Permissions.READ}>Read</option>
            <option value={Permissions.WRITE}>Write</option>
          </select>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Sharing..." : "Share"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default DocumentShareModal;
