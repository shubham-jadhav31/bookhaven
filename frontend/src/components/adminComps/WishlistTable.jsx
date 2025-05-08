import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import axios from 'axios';
import { deleteWishItemById, fetchAllWishItems } from '../../api/adminApi.js';
import { NavLink } from 'react-router-dom';

const WishlistTable = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

    // Fetch books from backend
    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const data = await fetchAllWishItems();
            console.log(`Response: ${data.message}`);
            if (Array.isArray(data.data)) {
            setWishlistItems(data.data);
            console.log("Data: ", data);
            } else {
            setWishlistItems([]);
            }
        } catch (err) {
            console.error('Failed to fetch books:', err);
        }
        };
        fetchBooks();
    }, []);

  const handleDelete = async (wishId) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        try {
          await deleteWishItemById(wishId);
          setWishlistItems((prevItems) => prevItems.filter((item) => item.wishlist_id !== wishId));
        } catch (err) {
          console.error("Failed to delete wish:", err);
          alert("Error deleting wish.");
        }
      }
    };

  return (
      <table className="admin-books-table">
        <thead>
          <tr>
            <th>Wishlist ID</th>
            <th>User ID</th>
            <th>User Email</th>
            <th>User Name</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Added On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map(item => (
            <tr key={item.wishlist_id}>
              <td>{item.wishlist_id}</td>
              <td>{item.user_id}</td>
              <td>{item.user_name}</td>
              <td>{item.email}</td>
              <td>{item.book_title}</td>
              <td>{item.author}</td>
              <td>₹{item.price ? Number(item.price).toFixed(2) : '0.00'}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td className="table-action-btns">
                <NavLink to={`/admin/edit-wish/${item.wishlist_id}`}>
                    <button><MdEdit size={18} /></button>
                </NavLink>
                <button onClick={() => handleDelete(item.wishlist_id)}>
                  <MdDelete size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default WishlistTable;
