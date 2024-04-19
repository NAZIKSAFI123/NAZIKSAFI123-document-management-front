import { useEffect, useState } from "react";
import { getUsersWithPermissions } from "../api/documentsApi";

function TableUsersPermissions({ documentId }) {
  const [usersWithPermissions, setUsersWithPermissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersPermissions = await getUsersWithPermissions(documentId);
        setUsersWithPermissions(usersPermissions);
      } catch (error) {
        console.error("Error fetching document users permissions:", error);
      }
    };
    fetchData();
  }, [documentId]);

  return (
    <div className="w-full lg:w-2/6 p-4">
      <div className="bg-white border rounded-lg">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Users permissions</h3>
          <div className="border-b border-gray-400 opacity-50 mb-2"></div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Permission
                </th>
              </tr>
            </thead>
            <tbody>
              {usersWithPermissions.map((userPermission) => (
                <tr
                  key={userPermission.userId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{userPermission.user.name}</td>
                  <td className="py-4 px-6">{userPermission.permission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableUsersPermissions;
