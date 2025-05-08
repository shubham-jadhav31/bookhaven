import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';

const EditCart = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [cartData, setCartData] = useState({
    user_id: '',
    book_id: '',
    quantity: 1
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_API_URL}/admin/getCartItemById/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const data = response.data.data;
        setCartData(data);
      })
      .catch(error => {
        console.error('Error fetching cart item:', error);
      });
  }, [cartId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCartData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.put(`${import.meta.env.VITE_API_URL}/admin/updateCartItemById/${cartId}`, cartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert('Cart item updated successfully!');
        navigate('/admin/books');
      })
      .catch(error => {
        console.error('Error updating cart item:', error);
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

      <h2 className="edit-page-title">Edit Cart Item</h2>
      <form onSubmit={handleSubmit} className="edit-page-form">
        <label className="edit-page-label">User ID:</label>
        <input
          className="edit-page-input"
          name="user_id"
          value={cartData.user_id}
          onChange={handleChange}
          required
          disabled
        />

        <label className="edit-page-label">Book ID:</label>
        <input
          className="edit-page-input"
          name="book_id"
          value={cartData.book_id}
          onChange={handleChange}
          required
          disabled
        />

        <label className="edit-page-label">Quantity:</label>
        <input
          className="edit-page-input"
          type="number"
          name="quantity"
          value={cartData.quantity}
          min="1"
          onChange={handleChange}
          required
        />

        <button type="submit" className="edit-page-button">
          Update Cart Item
        </button>
      </form>
    </div>
  );
};

export default EditCart;
