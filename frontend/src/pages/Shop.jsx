import { useEffect, useState } from "react";
import { SearchFilter } from "../components/UI/SearchFilter";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { fetchAllBooks } from "../api/bookApi.js";

export const Shop = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [categories, setCategories] = useState([]);

  const getCoverImage = (title) => {
    return `https://placehold.co/130x160/1a1a1a/ffffff?text=${encodeURIComponent(title || 'No Cover')}`;
  };

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

  useEffect(() => {
    const uniqueGenres = new Set();
  
    books.forEach(book => {
      if (book.genre) {
        uniqueGenres.add(book.genre);
      }
    });
  
    setCategories([...uniqueGenres]);
  }, [books]);
  

  // Filtered books based on search/genre
  const filteredBooks = books?.filter(book => 
    book.title.toLowerCase().includes(query.toLowerCase()) &&
    (genre ? book.genre === genre : true)
  );

  return (
    <div className="shop-container">
      <h2><FaSearch style={{marginRight:"8px"}} size={19} /> Browse Books</h2>

      <SearchFilter 
        query = {query}
        setQuery = {setQuery}
        filter = {genre}
        setFilter = {setGenre}
        books = {books}
        setBooks = {setBooks}
        categories={categories}
      />

      <div className="shop-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div className="shop-book-card" key={book.id}>
              <img src={getCoverImage(book.title, "./images/blank-book-cover-2.png")} alt={book.title} />
              <h3>{book.title}</h3>
              <p>By {book.author}</p>
              <p className="price">₹ {book.price}</p>
              <NavLink to={`/book-info/${book.id}`}>
                <button>Read more</button>
              </NavLink>
            </div>
          ))
        ) : (
          <p className="no-book-para">No books found.</p>
        )}
      </div>
    </div>
  );
};