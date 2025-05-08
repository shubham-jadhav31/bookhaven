import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';

export const BookInfo = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [isInCart, setIsInCart] = useState(false); // << New state
  const userId = 1;

  useEffect(() => {
      const fetchOneBook = async () => {
          try {
              const token = localStorage.getItem("token");
              const res = await fetch(`${import.meta.env.VITE_API_URL}/api/allBooks/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const data = await res.json();
              setBook(data.data);
          } catch(err) {
              console.error('Failed to fetch book: ', err);
          }
      };
      fetchOneBook();
  }, [id]);

  useEffect(() => {
    async function checkIfInCart() {
      console.log("Checking InCart ....");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await res.json();
        console.log("Cart check response: ", data);
    
        if (res.ok && data.inCart) {
          setIsInCart(true);
          console.log(":: True");
        } else {
          setIsInCart(false);
          console.log(":: False");
        }
      } catch (err) {
        console.error("Error checking cart: ", err);
        setIsInCart(false); // Default to false if error occurs
      }
    }
    checkIfInCart();
  }, [id]);
  

  useEffect(() => {
    async function checkWishlist() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wishListBooks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { wished } = await res.json();
        setIsWished(wished);
      } catch (err) {
        console.error('Error checking wishlist: ', err);
      }
    }
    checkWishlist();
  }, [id]);
  
  const toggleWishlist = async () => {
    const method = isWished ? 'DELETE' : 'POST';
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/api/wishListBooks/${id}`, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, }
    });
    toast(method === "DELETE" ? "📋 Removed from wish list" : "📋 Added in wish list", {autoClose: 3000});
    setIsWished(!isWished);
  };

  const addToCart = async () => {
    if (isInCart) {
      toast.info("🛒 Already in cart!", { autoClose: 2000 });
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          // userId: 1,
          bookId: id,
          quantity: quantity
        })
      });
  
      if (res.ok) {
        setIsInCart(true);
        toast.success("🛒 Book added to cart!", { autoClose: 2000 });
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart: ", err);
      toast.error("Failed to add to cart");
    }
  };
  
  const removeFromCart = async () => {
    if (!isInCart) {
      toast.info("🛒 Add to cart first!", { autoClose: 2000 });
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
  
      if (res.ok) {
        setIsInCart(false);
        toast.success("🛒 Book removed from cart!", { autoClose: 2000 });
        console.log("Book removed from cart");
      } else {
        throw new Error("Failed to remove from cart");
      }
    } catch (err) {
      console.error("Error removing from cart: ", err);
      toast.error("Failed to remove from cart");
    }
  };
  
  if (!book) return <div className="loading">Loading...</div>;

  return (
    <div className="container book-info-container">
      <div className="book-cover">
        <img
          src={`https://placehold.co/200x300/1a1a1a/ffffff?text=${encodeURIComponent(book.title)}`}
          alt={book.title}
        />
      </div>

      <div className="book-info-details">
        <h1 className="book-info-title">{book.title}</h1>
        <p className="book-info-author-n-genre"><span>by {book.author}</span> | <span>{book.genre}</span></p>
        <p className="bookinfo-description">{book.description}</p>

        <div className="book-meta-1">
          <h2>₹{book.price}</h2>
          <div className="book-action-section">
            <div className="quantity-box">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            {/* Add to Cart and Remove from Cart Buttons */}
            {!isInCart ? (
              <button className="add-to-cart-btn" onClick={addToCart}>
                <FaShoppingCart /> Add to Cart
              </button>
            ) : (
              <>
                <button className="add-to-cart-btn" onClick={addToCart}>
                  <FaShoppingCart /> In Cart
                </button>
                <button className="remove-from-cart-btn" onClick={removeFromCart}>
                  Remove
                </button>
              </>
            )}

            {/* Wishlist Button */}
            <button className={`wishlist-btn ${isWished ? 'wished' : ''}`} onClick={toggleWishlist}>
              <FaHeart size={16} />
            </button>
          </div>
        </div>

        <div className="book-meta-2">
          <div className="book-meta-2-split">
            <div className="book-meta-2-left">
              <h3>Book Details</h3>
              <p><span className="meta-key">Title:</span> {book.title}</p>
              <p><span className="meta-key">Author:</span> {book.author}</p>
              <p><span className="meta-key">Publisher:</span> {book.publisher}</p>
              <p><span className="meta-key">Language:</span> {book.language}</p>
              <p><span className="meta-key">ISBN:</span> {book.isbn}</p>
            </div>

            <div className="book-meta-2-right">
              <h3>Physical Details</h3>
              <p><span className="meta-key">Format:</span> {book.format}</p>
              <p><span className="meta-key">Pages:</span> {book.pages}</p>
              <p><span className="meta-key">Dimension:</span> {book.dimension}</p>
              <p><span className="meta-key">Weight:</span> {book.weight}</p>
            </div>
          </div>
        </div>

        <div className="book-desc">
          <h3>Description</h3>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
};
