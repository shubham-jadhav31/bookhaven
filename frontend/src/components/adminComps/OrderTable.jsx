import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import { deleteOrderItemById, fetchAllOrderItems } from '../../api/adminApi';
import { NavLink } from 'react-router-dom';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  // Fetch books from backend
    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const data = await fetchAllOrderItems();
            console.log(`Response: ${data.message}`);
            if (Array.isArray(data.data)) {
                setOrders(data.data);
            console.log("Data: ", data);
            } else {
                setOrders([]);
            }
        } catch (err) {
            console.error('Failed to fetch books:', err);
        }
        };
        fetchBooks();
    }, []);

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteOrderItemById(orderId);
        setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== orderId));
      } catch (err) {
        console.error("Failed to delete order:", err);
        alert("Error deleting order.");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'Shipped': return 'blue';
      case 'Delivered': return 'green';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
      <table className="admin-books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Total (₹)</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.user_name}</td>
              <td>₹{Number(order.total_amount).toFixed(2)}</td>
              <td style={{ color: getStatusColor(order.status) }}>
                {order.status}
              </td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td className="table-action-btns">
                <NavLink to={`/admin/edit-order/${order.order_id}`}>
                    <button><MdEdit size={18} /></button>
                </NavLink>
                <button onClick={() => handleDelete(order.order_id)}>
                  <MdDelete size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default OrderTable;
