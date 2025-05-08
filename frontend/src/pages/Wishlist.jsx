import { useEffect, useRef, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { fetchWishListBooks } from "../api/bookApi";
import { toast } from 'react-toastify';

export const Wishlist = () => {
    const { id } = useSearchParams();
    const [wishlist_books, setWishlist_books] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false); // <-- modal state
    // const userId = 1;
    const hasFetched = useRef(false);

    const getCoverImage = (title) => {
        return `https://placehold.co/100x120/1a1a1a/ffffff?text=${encodeURIComponent(title || 'No Cover')}`;
      };

    const fetchWishlistBooks = async () => {
        try {
            // console.log(`Requesting info for ${userId}`);
            const data = await fetchWishListBooks();
            console.log(`Book Details res: ${data.message}`);
            console.log("Res object: ", data);
            console.log("First Book: ", data.data[0]);
            // toast.success("Sucessfully fetched wishlist", { autoClose: 1500 });
            setWishlist_books(data.data);
        } catch(err) {
            console.error('Failed to fetch book: ', err);
            toast.success("Sucessfully fetched wishlist");
        }
    };

    useEffect(() => {
        if (hasFetched.current) return; // prevent second call in dev mode
        hasFetched.current = true;
        fetchWishlistBooks();
    }, []);

    const addToCart = async (bookId, quantity = 1) => {
        // console.log(`Adding to cart: userid: ${userId} | bookId: ${bookId} | quantity: ${quantity}`);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            //   userId: userId,
              bookId: bookId,
              quantity: quantity,
            })
          });
      
          if (res.ok) {
            toast.success("🛒 Book added to cart!", { autoClose: 2000 });
          } else {
            throw new Error("Failed to add to cart");
          }
        } catch (err) {
          console.error("Error adding to cart: ", err);
          toast.error("Failed to add to cart");
        }
    };

    const removeBookFromWishlist = async (bookId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wishListBooks/${bookId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, }
            });

            if (res.ok) {
                toast.success("🛒 Book remove from wishlist!", { autoClose: 2000 });
                fetchWishlistBooks();
            } else {
                throw new Error("Failed to remove from wishlist");
            }
        } catch (err) {
            console.log("Error removing from wishlist: ", err);
            toast.error("Failed to remove from wishlist");
        }
    }

    const handleRemoveAll = async () => {
        console.log("Removing all wishlist books...");

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wishListBooks_all/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, }
            });

            if (res.ok) {
                toast.success("All books removed from wishlist!", { autoClose: 2000 });
                fetchWishlistBooks();
                setWishlist_books([]);
                setShowConfirmPopup(false);
            } else {
                throw new Error("Failed to truncate from wishlist");
            }

        } catch (err) {
            console.error("Error removing all books: ", err);
            toast.error("Failed to remove all books");
        }
    };


    return (
        <div className="container wishlist-container">
            <h2><FaHeart style={{ marginRight: '8px' }} size={19} />  My Wishlist</h2>
            <div className="wishlist-div">
                <div className="wishlist-title-info">
                    <h3>Your Wishlist ({wishlist_books?.length} items)</h3>
                    <button onClick={() => setShowConfirmPopup(true)} ><RiDeleteBin5Line size={13} /> Remove All</button>
                </div>
                <div className="wishlist-book">
                    {wishlist_books?.length > 0 ? (
                        wishlist_books?.map(book => (
                            <div className="wishlist-card" key={book.wishlist_id}>
                                <img src={getCoverImage(book.title, "./images/blank-book-cover-2.png")} alt={book.title} />
                                <div className="wishlist-info">
                                    <NavLink to={`/book-info/${book.id}`}>
                                        <h3>{book.title}</h3>
                                        <p className="author-name gray-txt">By {book.author}</p>
                                        <p className="price">₹ {book.price}</p>
                                    </NavLink>
                                    <div className="wishlist-card-btns">
                                        {book.in_cart ? ( 
                                            <button 
                                                className="cart-btn"
                                                disabled
                                            >
                                                <FaShoppingCart size={13} /> Already in cart
                                            </button> ) : (
                                                <button 
                                                    className="cart-btn"
                                                    onClick={() => addToCart(book.id, quantity)}
                                                >
                                                    <FaShoppingCart size={13} /> Add to cart
                                                </button>
                                            )                                        
                                        }
                                        <button 
                                            className="remove-btn"
                                            onClick={() => removeBookFromWishlist(book.id)}
                                        >
                                            <RiDeleteBin5Line size={13} /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-array-msg">
                            <h3>No Books in wishlist.</h3>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmPopup && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Are you sure to <u>remove all</u> books from wishlist?</h3>
                        <div className="modal-buttons">
                            <button className="yes-btn" onClick={handleRemoveAll}>Yes</button>
                            <button className="no-btn" onClick={() => setShowConfirmPopup(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}