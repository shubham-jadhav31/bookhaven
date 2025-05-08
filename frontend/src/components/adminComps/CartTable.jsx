import { useEffect, useState } from "react";
import { deleteCartItemById, fetchAllCartItems } from "../../api/adminApi.js";
import { NavLink } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

export const CartTable = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetchAllCartItems();
      if (Array.isArray(res.data)) {
        setCartItems(res.data);
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, []);

  const handleDelete = async (itemId) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        try {
          await deleteCartItemById(itemId);
          setCartItems((prevItems) => prevItems.filter((item) => item.cart_id !== itemId));
        } catch (err) {
          console.error("Failed to delete book:", err);
          alert("Error deleting book.");
        }
      }
    };

  return (
    <table className="admin-books-table">
      <thead>
        <tr>
          <th>ID</th><th>User ID</th><th>User Name</th><th>Email</th><th>Book Title</th><th>Author</th><th>Price</th><th>Quantity</th><th>Total Price</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
            <tr key={item.cart_id}>
            <td>{item.cart_id}</td>
            <td>{item.user_id}</td>
            <td>{item.user_name}</td>
            <td>{item.email}</td>
            <td>{item.book_title}</td>
            <td>{item.author}</td>
            <td>₹{item.price ? Number(item.price).toFixed(2) : '0.00'}</td>
            <td>{item.quantity}</td>
            <td>₹{item.total_price ? Number(item.total_price).toFixed(2) : '0.00'}</td>
            <td className="table-action-btns">
                <NavLink to={`/admin/edit-cart/${item.cart_id}`}>
                    <button><MdEdit size={18} /></button>
                </NavLink>
                <button onClick={() => handleDelete(item.cart_id)}>
                    <MdDelete size={18} />
                </button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
  );
};
