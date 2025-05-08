import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchAllBooks } from "../../api/bookApi";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteBookById } from "../../api/adminApi";

export const BookTable = () => {
      const [books, setBooks] = useState([]);
    
      // Fetch books from backend
      useEffect(() => {
        const fetchBooks = async () => {
          try {
            const data = await fetchAllBooks();
            console.log(`Response: ${data.message}`);
            if (Array.isArray(data.data)) {
              setBooks(data.data);
              console.log("Data: ", data);
            } else {
              setBooks([]);
            }
          } catch (err) {
            console.error('Failed to fetch books:', err);
          }
        };
        fetchBooks();
      }, []);

      const handleDelete = async (bookId) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
          try {
            await deleteBookById(bookId);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
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
              <th>Book ID</th><th>Title</th><th>Author</th><th>Genre</th><th>Price (₹)</th><th>Stock</th><th>Rating</th><th>Language</th><th>Publisher</th><th>ISBN</th><th>Format</th><th>Pages</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td><td>{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>{book.price}</td><td>{book.stock}</td><td>{book.rating}</td><td>{book.language}</td><td>{book.publisher}</td><td>{book.isbn}</td><td>{book.format}</td><td>{book.pages}</td>
                <td className="table-action-btns">
                  <NavLink to={`/admin/edit-book/${book.id}`}>
                    <button><MdEdit size={18} /></button>
                  </NavLink>
                  <button onClick={() => handleDelete(book.id)}><MdDelete size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    );
}