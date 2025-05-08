import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { deleteUserById, fetchAllUsers } from "../../api/adminApi.js";
import { MdEdit, MdDelete } from "react-icons/md";

export const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchAllUsers();
        console.log(`Response-UserTable: ${data.message}`);
        if (Array.isArray(data.data)) {
          setUsers(data.data);
          console.log("Data: ", data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserById(userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (err) {
        console.error("Failed to delete user:", err);
        alert("Error deleting user.");
      }
    }
  };

  return (
    <table className="admin-books-table">
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Location</th><th>Member Since</th><th>Is Admin</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td><td>{user.location}</td>
            <td>{user.member_since}</td><td>{user.is_admin ? "Yes" : "No"}</td>
            <td className="table-action-btns">
              <NavLink to={`/admin/edit-user/${user.id}`}>
                <button><MdEdit size={18} /></button>
              </NavLink>
              <button onClick={() => handleDelete(user.id)}><MdDelete size={18} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
