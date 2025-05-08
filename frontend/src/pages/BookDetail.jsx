import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BookDetail = () => {
  const { bookKey } = useParams();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoogleBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookKey}`);
        if (!response.ok) throw new Error("Book not found");
        const data = await response.json();

        if (data?.volumeInfo) {
          setBookData(data.volumeInfo);
        } else {
          setError("No book found");
        }
      } catch (err) {
        setError("Something went wrong");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleBook();
  }, [bookKey]);

  if (loading) return <div className="book-info">Loading...</div>;
  if (error) return <div className="book-info error">{error}</div>;

  const {
    title,
    authors,
    publishedDate,
    publisher,
    description,
    pageCount,
    categories,
    language,
    imageLinks,
    previewLink
  } = bookData;

  const coverUrl = imageLinks?.thumbnail || "https://via.placeholder.com/250x350?text=No+Cover";

  return (
    <div className="book-detail">
      <div className="book-detail-container">
        <div className="book-detail-left">
          <img src={coverUrl} alt={title} className="book-detail-cover" />
        </div>
        <div className="book-detail-right">
          <h1>{title}</h1>
          <p><strong>Author(s):</strong> {authors?.join(", ") || "Unknown"}</p>
          <p><strong>Published Date:</strong> {publishedDate || "N/A"}</p>
          <p><strong>Publisher:</strong> {publisher || "N/A"}</p>
          <p><strong>Page Count:</strong> {pageCount || "N/A"}</p>
          <p><strong>Language:</strong> {language?.toUpperCase() || "N/A"}</p>
          <p><strong>Categories:</strong> {categories?.join(", ") || "N/A"}</p>
          {description && (
            <p><strong>Description:</strong><br /> <span className="book-detail-desc">{description}</span></p>
          )}
          {previewLink && (
            <a
              className="book-detail-link"
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 Preview on Google Books
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
