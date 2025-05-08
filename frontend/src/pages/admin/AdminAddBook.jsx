import { useState } from "react";
import axios from "axios";
import Papa from "papaparse";

const AdminAddBook = () => {
  const [mode, setMode] = useState("manual"); // "manual" or "csv"
  const [message, setMessage] = useState("");

  // Manual form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    price: "",
    stock: "",
    rating: "",
    cover_image: "",
    language: "",
    publisher: "",
    isbn: "",
    format: "",
    pages: "",
  });
  
  

  // CSV state
  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const books = results.data;
  
        const expectedColumns = [
          'title', 'author', 'price', 'genre', 'isbn', 'publisher',
          'language', 'format', 'pages', 'dimension', 'weight', 'description'
        ];
  
        const csvColumns = Object.keys(books[0]);
        const missingColumns = expectedColumns.filter(col => !csvColumns.includes(col));
        if (missingColumns.length > 0) {
          alert(`❌ Missing columns in CSV: ${missingColumns.join(', ')}`);
          return;
        }
  
        const validBooks = [];
        const errors = [];
  
        books.forEach((book, index) => {
          const rowNum = index + 2;
  
          if (!book.title || !book.author || !book.price) {
            errors.push(`❌ Missing required fields at row ${rowNum}`);
          } else {
            const price = parseFloat(book.price);
            if (isNaN(price)) {
              errors.push(`❌ Invalid price at row ${rowNum}`);
            }
  
            validBooks.push({
              title: book.title.trim(),
              author: book.author.trim(),
              price: price,
              genre: book.genre?.trim(),
              stock: parseInt(book.stock) || 0,
              description: book.description?.trim(),
              isbn: book.isbn?.trim(),
              publisher: book.publisher?.trim(),
              language: book.language?.trim(),
              format: book.format?.trim(),
              pages: parseInt(book.pages) || null,
              dimension: book.dimension?.trim(),
              weight: book.weight?.trim(),
            });
          }
        });
  
        if (errors.length > 0) {
          alert(errors.join("\n"));
          return;
        }
  
        try {
          const token = localStorage.getItem("token");
          // Wrap validBooks inside an object as the backend expects
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/admin/bulkAddBooks`,
            { books: validBooks }, // <-- FIXED HERE
            { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } }
          );
          alert("✅ Books imported successfully!");
        } catch (error) {
          console.error("Error uploading books:", error);
          alert("❌ Failed to upload books.");
        }
      },
    });
  };
  
  

  // Manual handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((f) => ({ ...f, image: files[0] }));
    } else {
      setFormData((f) => ({ ...f, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const title = formData.title; // Store title before resetting
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/addBook`, formData,
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } }
      );
      setMessage(`✅ "${title}"- Book added successfully!`);
      setFormData({
        title: "",
        author: "",
        description: "",
        genre: "",
        price: "",
        stock: "",
        rating: "",
        cover_image: "",
        language: "",
        publisher: "",
        isbn: "",
        format: "",
        pages: "",
      });
    } catch(err) {
      console.log("Error adding book: ", err);
      setMessage(`❌ Failed to add "${title}".`);
    }
  };
  
  

  return (
    <div className="add-book-container">
      <h2 className="add-book-title">Add Books</h2>

      <div className="add-book-tabs">
        <button
          className={mode === "manual" ? "tab actived" : "tab"}
          onClick={() => setMode("manual")}
        >
          Manual Entry
        </button>
        <button
          className={mode === "csv" ? "tab actived" : "tab"}
          onClick={() => setMode("csv")}
        >
          Import via CSV
        </button>
      </div>

      {message && <p className="add-book-message">{message}</p>}

      {mode === "manual" ? (
        <form onSubmit={handleSubmit} className="add-book-form">
        <div className="add-book-field">
          <label htmlFor="title" className="add-book-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="add-book-input"
            placeholder="Title of Book"
          />
        </div>
  
        <div className="add-book-field">
          <label htmlFor="author" className="add-book-label">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="add-book-input"
            placeholder="Enter Author Name"
          />
        </div>
  
        <div className="add-book-field">
          <label htmlFor="genre" className="add-book-label">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="add-book-input"
            placeholder="Enter Genre"
          />
        </div>
  
        <div className="add-book-field">
          <label htmlFor="price" className="add-book-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="add-book-input"
            placeholder="₹ Price"
          />
        </div>
  
        <div className="add-book-field">
          <label htmlFor="stock" className="add-book-label">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="add-book-input"
            placeholder="Enter Stock"
          />
        </div>
  
        {/* <div className="add-book-field">
          <label htmlFor="image" className="add-book-label">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="add-book-file"
          />
        </div> */}

        <div className="add-book-field">
          <label htmlFor="rating" className="add-book-label">Rating</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="add-book-input"
            placeholder="Enter rating (e.g. 8.5)"
          />
        </div>

        <div className="add-book-field">
          <label htmlFor="language" className="add-book-label">Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="add-book-input"
            placeholder="Enter language (e.g. English)"
          />
        </div>

        <div className="add-book-field">
          <label htmlFor="publisher" className="add-book-label">Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="add-book-input"
            placeholder="Enter publisher name"
          />
        </div>

        <div className="add-book-field">
          <label htmlFor="isbn" className="add-book-label">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="add-book-input"
            placeholder="Enter ISBN"
          />
        </div>

        <div className="add-book-field">
          <label htmlFor="format" className="add-book-label">Format</label>
          <input
            type="text"
            id="format"
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="add-book-input"
            placeholder="e.g. Hardcover, Paperback, eBook"
          />
        </div>

        <div className="add-book-field">
          <label htmlFor="pages" className="add-book-label">Pages</label>
          <input
            type="number"
            id="pages"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            className="add-book-input"
            placeholder="Enter number of pages"
          />
        </div>

          
        <div className="add-book-field">
          <label htmlFor="description" className="add-book-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="add-book-textarea"
            placeholder="Enter Description"
          />
        </div>
  
        <button type="submit" className="add-book-button">➕ Add Book</button>
      </form>
      ) : (
        <div className="csv-import">
          <label className="add-book-label">Upload CSV:</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            className="add-book-file"
          />
        </div>
      )}
    </div>
  );
};

export default AdminAddBook;
