import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';

const EditWish = () => {
  const { wishId } = useParams();
  const navigate = useNavigate();
  const [wishData, setWishData] = useState({
    user_id: '',
    book_id: '',
    created_at: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_API_URL}/admin/getWishItemById/${wishId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const data = response.data.data;
        const formatted = {
          ...data,
          created_at: data.created_at ? data.created_at.split('T')[0] : '',
        };
        setWishData(formatted);
      })
      .catch(error => {
        console.error('Error fetching wishlist item:', error);
      });
  }, [wishId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWishData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.put(`${import.meta.env.VITE_API_URL}/admin/updateWishItemById/${wishId}`, wishData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert('Wishlist item updated successfully!');
        navigate('/admin/books');
      })
      .catch(error => {
        console.error('Error updating wishlist item:', error);
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

      <h2 className="edit-page-title">Edit Wishlist Item</h2>
      <form onSubmit={handleSubmit} className="edit-page-form">
        <label className="edit-page-label">User ID:</label>
        <input
          className="edit-page-input"
          name="user_id"
          value={wishData.user_id}
          onChange={handleChange}
          required
          disabled
        />

        <label className="edit-page-label">Book ID:</label>
        <input
          className="edit-page-input"
          name="book_id"
          value={wishData.book_id}
          onChange={handleChange}
          required
          disabled
        />

        <label className="edit-page-label">Created At:</label>
        <input
          className="edit-page-input"
          type="date"
          name="created_at"
          value={wishData.created_at}
          onChange={handleChange}
          disabled // usually shouldn't be editable
        />

        <button type="submit" className="edit-page-button">
          Update Wishlist Item
        </button>
      </form>
    </div>
  );
};

export default EditWish;
