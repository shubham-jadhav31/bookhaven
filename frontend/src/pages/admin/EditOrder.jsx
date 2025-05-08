import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';

const EditOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    user_id: '',
    total: '',
    status: 'Pending'
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_API_URL}/admin/getOrderItemById/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Adjust scheme if your backend expects something else
        },
      })
      .then(response => {
        const data = response.data.data;
        setOrderData(data);
      })
      .catch(error => {
        console.error('Error fetching order:', error);
      });
  }, [orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.put(`${import.meta.env.VITE_API_URL}/admin/updateOrderItemById/${orderId}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert('Order updated successfully!');
        navigate('/admin/books');
      })
      .catch(error => {
        console.error('Error updating order:', error);
      });
  };

  return (
    <div className="edit-page-container">
      <NavLink to="/admin/books">
        <button className="back-btn">
          <IoMdArrowRoundBack size={20} className="icon-padding" />
          <span className="btn-txt">Back</span>
        </button>
      </NavLink>

      <h2 className="edit-page-title">Edit Order</h2>
      <form onSubmit={handleSubmit} className="edit-page-form">
        <label className="edit-page-label">User ID:</label>
        <input
          className="edit-page-input"
          name="user_id"
          value={orderData.user_id}
          onChange={handleChange}
          required
          disabled
        />

        <label className="edit-page-label">Total Amount:</label>
        <input
          className="edit-page-input"
          name="total"
          type="number"
          step="0.01"
          value={orderData.total}
          onChange={handleChange}
          required
        />

        <label className="edit-page-label">Status:</label>
        <select
          className="edit-page-input"
          name="status"
          value={orderData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit" className="edit-page-button">
          Update Order
        </button>
      </form>
    </div>
  );
};

export default EditOrder;
