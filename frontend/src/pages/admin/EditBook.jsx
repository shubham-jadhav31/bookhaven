import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';

const EditBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    price: '',
    genre: '',
    rating: '',
    stock: '',
    cover_image: '',
    description: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_API_URL}/admin/getBookById/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Response: ", response.data);
        setBookData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.put(`${import.meta.env.VITE_API_URL}/admin/updateBookById/${bookId}`, bookData, {
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
            <button className='back-btn'><IoMdArrowRoundBack size={20} className="icon-padding" /> <span className="btn-txt">Back</span></button>
        </NavLink>
      <h2 className="edit-page-title">Edit Book Record</h2>
      <form onSubmit={handleSubmit} className="edit-page-form">
        <label className="edit-page-label">Title:</label>
        <input className="edit-page-input" name="title" value={bookData.title} onChange={handleChange} required />

        <label className="edit-page-label">Author:</label>
        <input className="edit-page-input" name="author" value={bookData.author} onChange={handleChange} required />

        <label className="edit-page-label">Price:</label>
        <input className="edit-page-input" type="number" step="1" name="price" value={bookData.price} onChange={handleChange} required />

        <label className="edit-page-label">Genre:</label>
        <input className="edit-page-input" name="genre" value={bookData.genre} onChange={handleChange} />

        <label className="edit-page-label">Rating:</label>
        <input className="edit-page-input" type="number" step="0.1" name="rating" value={bookData.rating} onChange={handleChange} />

        <label className="edit-page-label">Stock:</label>
        <input className="edit-page-input" type="number" name="stock" value={bookData.stock} onChange={handleChange} />

        <label className="edit-page-label">Cover Image URL:</label>
        <input className="edit-page-input" name="cover_image" value={bookData.cover_image} onChange={handleChange} />

        <label className="edit-page-label">Description:</label>
        <textarea className="edit-page-textarea" name="description" value={bookData.description} onChange={handleChange} />

        <button type="submit" className="edit-page-button">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
