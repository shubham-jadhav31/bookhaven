import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    member_since: '',
    is_admin: false,
  });

  useEffect(() => {
    // Fetch existing user data
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_API_URL}/admin/getUserById/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const data = response.data.data;
        // Format date for input[type=date] if necessary
        const formatted = {
          ...data,
          member_since: data.member_since ? data.member_since.split('T')[0] : ''
        };
        setUserData(formatted);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.put(`${import.meta.env.VITE_API_URL}/admin/updateUserById/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert('Book updated successfully!');
        navigate('/admin/books');
      })
      .catch(error => {
        console.error('Error updating book:', error);
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

      <h2 className="edit-page-title">Edit User</h2>
      <form onSubmit={handleSubmit} className="edit-page-form">
        <label className="edit-page-label">Name:</label>
        <input
          className="edit-page-input"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />

        <label className="edit-page-label">Email:</label>
        <input
          className="edit-page-input"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <label className="edit-page-label">Password:</label>
        <div className="edit-page-input-wrapper">
        <input
            className="edit-page-input"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={userData.password}
            onChange={handleChange}
        />
        <span
            onClick={togglePasswordVisibility}
            className="toggle-password-icon"
        >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
        </div>


        <label className="edit-page-label">Phone:</label>
        <input
          className="edit-page-input"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />

        <label className="edit-page-label">Location:</label>
        <input
          className="edit-page-input"
          name="location"
          value={userData.location}
          onChange={handleChange}
        />

        <label className="edit-page-label">Member Since:</label>
        <input
          className="edit-page-input"
          type="date"
          name="member_since"
          value={userData.member_since}
          onChange={handleChange}
        />

        <label className="edit-page-label">Is Admin:</label>
        <input
          className="edit-page-checkbox"
          type="checkbox"
          name="is_admin"
          checked={userData.is_admin}
          onChange={handleChange}
        />

        <button type="submit" className="edit-page-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
