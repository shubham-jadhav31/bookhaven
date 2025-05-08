import React, { useEffect, useState, useTransition } from "react";
import { Loader } from "../components/UI/Loader";
import { NavLink } from "react-router-dom";
import { SearchFilter } from "../components/UI/SearchFilter";
import { FaArrowCircleLeft, FaArrowCircleRight, FaSearch } from "react-icons/fa";

// Ensure you set your API key as an environment variable: VITE_GOOGLE_BOOKS_API_KEY
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const randomKeywords = [
  "history", "magic", "poetry", "travel", "art", "science", "fiction",
  "technology", "novel", "health", "adventure", "nature", "psychology",
  "engineering", "education", "fantasy", "biography", "space", "music", "culture"
];

const getRandomKeyword = () => {
  const index = Math.floor(Math.random() * randomKeywords.length);
  return randomKeywords[index];
};

const getRandomStartIndex = () => Math.floor(Math.random() * 30);

export const OpenSearch = () => {
  const [books, setBooks] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [lastSearchedTerm, setLastSearchedTerm] = useState("");
  const [search, setSearch] = useState(""); // Will be set on mount with random keyword
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 20;


  const fetchBooks = async (searchTerm, customStartIndex = startIndex) => {
    startTransition(async () => {
      try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchTerm
        )}&startIndex=${customStartIndex}&maxResults=${maxResults}${API_KEY ? `&key=${API_KEY}` : ""}`;        

        console.log("Fetching books from URL:", url);

        const res = await fetch(url);
        const data = await res.json();
        setBooks(data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
      setLastSearchedTerm(searchTerm);
      console.log("StartIndex before fetch: ", startIndex);
      setStartIndex(customStartIndex); // Store the one we used      
      console.log("StartIndex after fetch: ", startIndex);
    });
  };

  const refreshRecommendations = () => {
    const randomKeyword = getRandomKeyword();
    const randomStart = getRandomStartIndex();
    setSearch(randomKeyword);
    setQuery("");       // Reset sub-filter input
    setFilter("all");   // Reset filter
    fetchBooks(randomKeyword, randomStart);
  };
  

  useEffect(() => {
    const initialKeyword = getRandomKeyword();
    // const startIndex = getRandomStartIndex();
    const startIndex = 0;
    fetchBooks(initialKeyword, startIndex);
    setSearch(initialKeyword);
  }, []);

  useEffect(() => {
    const uniqueCategories = new Set();

    books.forEach(book => {
      const bookCategories = book.volumeInfo?.categories || [];
      bookCategories.forEach(cat => uniqueCategories.add(cat));
    });

    setCategories([...uniqueCategories]);
  }, [books]);

  const handleSearch = (e) => {
    e.preventDefault();
    setBooks([]);
    setLastSearchedTerm(search);
    setStartIndex(0); // Store the one we used
    console.log("Search : ", search);
    console.log("StartIndex : ", startIndex);
    fetchBooks(search, 0);
  };

    const filteredBooks = books.filter((book) => {
    const info = book.volumeInfo || {};
    const lowerQ = query.toLowerCase();

    // — match title
    const matchesTitle = info.title?.toLowerCase().includes(lowerQ);

    // — match any author
    const matchesAuthor = info.authors
      ? info.authors.some(a => a.toLowerCase().includes(lowerQ))
      : false;

    // — match year exactly (take first 4 chars of publishedDate)
    const pubYear = info.publishedDate?.slice(0, 4);
    const matchesYear = pubYear === query;

    // if query is empty, we pass everything
    const searchMatch = !query || matchesTitle || matchesAuthor || matchesYear;

    // your existing category filter
    const categoryMatch =
      filter === "all" ||
      (info.categories || []).some(cat =>
        cat.toLowerCase().includes(filter.toLowerCase())
      );

    return searchMatch && categoryMatch;
  });


  return (
    <div className="container book-container">
      <form onSubmit={handleSearch} className="form-search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, author, or keyword"
        />
        <button className="cst-btn" type="submit">
          Search
        </button>
        <button className="cst-btn refresh-btn" type="button" onClick={refreshRecommendations}>
          Refresh
        </button>
      </form>

      <SearchFilter
        query={query}
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
        books={books}
        setBooks={setBooks}
        categories={categories}
      />

      {isPending && <Loader />}

      {!isPending && filteredBooks.length > 0 && (
        <h2 className="head-count">
          <FaSearch className="mt-4" /> {filteredBooks.length} books found -{" "}
          {lastSearchedTerm}
        </h2>
      )}

      <div className="books-grid">
        {!isPending && filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            const info = book.volumeInfo || {};
            return (
              <div className="book-card" key={book.id}>
                {info.imageLinks?.thumbnail ? (
                  <img
                    src={info.imageLinks.thumbnail}
                    alt={info.title}
                  />
                ) : (
                  <img
                    src="./images/blank-book-cover-2.png"
                    alt="No cover"
                  />
                )}
                <h3>{info.title}</h3>
                <p>
                  <strong>Author:</strong>{" "}
                  {info.authors ? info.authors.join(", ") : "Unknown"}
                </p>
                <p>
                  <strong>Year:</strong>{" "}
                  {info.publishedDate ? info.publishedDate : "N/A"}
                </p>
                <NavLink to={`/bookDetail/${book.id}`}>
                  <button className="read-btn">Read More</button>
                </NavLink>
              </div>
            );
          })
        ) : (
          books.length === 0 &&
          !isPending && (
            <div className="empty-array-msg mg-auto">
              <h3>No books found for "{lastSearchedTerm}".</h3>
            </div>
          )
        )}
      </div>

      <div className="pagination-controls">
        <button
          className="cst-btn"
          disabled={startIndex === 0}
          onClick={() => {
            fetchBooks(search, startIndex - maxResults);
            window.scrollTo(0, 0); // Scroll to top
          }}
        >
          <FaArrowCircleLeft /> Previous
        </button>
        <span>
          {console.log("StartIndex at buttons: ", startIndex)}
          Showing {startIndex + 1} - {startIndex + filteredBooks.length}
        </span>
        <button
          className="cst-btn"
          onClick={() => {
            fetchBooks(search, startIndex + maxResults);
            window.scrollTo(0, 0);
          }}
        >
          Next <FaArrowCircleRight />
        </button>
      </div>
    </div>
  );
};
