import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaLongArrowAltRight } from "react-icons/fa";
import {fetchCartListBooks } from "../api/bookApi.js"
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

export const Cart = () => {
    const { id } = useSearchParams();
    const [cartlist_books, setCartlist_books] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false); // <-- modal state
    const [billTotal, setBillTotal] = useState(100);
    const user_id = 1;

    const getCoverImage = (title) => {
        return `https://placehold.co/30x30/1a1a1a/ffffff?text=${encodeURIComponent(title || 'No Cover')}`;
      };

    const fetchCartBooks = async () => {
        try {
            // console.log(`Requesting info for user_id: ${user_id}`);
            const data = await fetchCartListBooks();
            console.log("Book Details res:", data);
            console.log(`Book Count res: ${data.data?.length}`);
            if (Array.isArray(data.data)) {
                setCartlist_books(data.data);
                console.log("First Cart Item: ", data.data[0]);
            } else {
                setCartlist_books([]); // fallback to prevent null
            }
        } catch(err) {
            console.error('Failed to fetch book: ', err);
        }
    };

    useEffect(() => {
        fetchCartBooks();
    }, []);

    useEffect(() => {
        const total = cartlist_books.reduce((acc, book) => acc + (book.price * book.quantity), 0);
        setBillTotal(Number(total.toFixed(2)));
    }, [cartlist_books, quantity]);

    const removeBookFromCart = async (bookId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            });
        
            if (res.ok) {
            toast.success("🛒 Book removed from cart!", { autoClose: 2000 });
            console.log("Book removed from cart");
            fetchCartBooks(); // refresh Cart
            } else {
            throw new Error("Failed to remove from cart");
            }
        } catch (err) {
            console.error("Error removing from cart: ", err);
            toast.error("Failed to remove from cart");
        }
    }

    const handleRemoveAllCart = async () => {
            console.log("Removing all cart books...");
    
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart_all/`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                });
    
                if (res.ok) {
                    toast.success("All books removed from cart!", { autoClose: 2000 });
                    fetchCartBooks();
                    setCartlist_books([]);
                    setShowConfirmPopup(false);
                } else {
                    throw new Error("Failed to truncate from cart");
                }
    
            } catch (err) {
                console.error("Error removing all books: ", err);
                toast.error("Failed to remove all books");
            }
        };
        

    return (
        <div className="container cart-container">
            <h2><FaShoppingCart style={{ marginRight: '8px' }} size={19} /> My Cart</h2>
            <div className="cart-div">
                <div className="wishlist-title-info">
                    <h3>Your Cart ({cartlist_books?.length || 0} items)</h3>
                    {cartlist_books?.length > 0 && (
                        <button onClick={() => setShowConfirmPopup(true)}><RiDeleteBin5Line size={13} /> Remove All</button>
                    )}
                </div>
                <div className="cart-view">
                    <div className="cartlist-book">
                        <div className="table-head">
                            <h3 className="col1">Product</h3>
                            <h3 className="col2">Price</h3>
                            <h3 className="col3">Quantity</h3>
                            <h3 className="col4">Total</h3>
                        </div>
                        {cartlist_books?.length > 0 ? (
                            cartlist_books.map(book => (
                                <div className="cartlist-card" key={book.id}>
                                    <img src={getCoverImage(book.title, "./images/blank-book-cover-2.png")} alt={book.title} />
                                    <div className="cartlist-info col1">
                                        <NavLink to={`/book-info/${book.id}`}>
                                            <h3>{book.title}</h3>
                                            <p className="gray-txt">By {book.author}</p>
                                        </NavLink>
                                    </div>
                                    <p className="price col2">₹ {book.price}</p>
                                    <p className="col3">{book.quantity}</p>
                                    {/* <div className="quantity-box">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => setQuantity(q => q + 1)}>+</button>
                                    </div> */}
                                    <p className="total-price col4">₹ {book.price * book.quantity}</p>
                                    <button 
                                        className="remove-btn col5" 
                                        onClick={() => removeBookFromCart(book.id)}
                                    >
                                        <MdDelete size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="empty-array-msg dflex">
                                <h3 className="col1">No books in cart.</h3>
                                <p className="col2">-</p>
                                <p className="col3">-</p>
                                <p className="col4">-</p>
                            </div>
                        )}
                    </div>

                    <div className="cart-bill">
                        <h2>Order Summary</h2>
                        <div className="bill-row">
                            <p className="gray-txt wd-70">Sub-Total </p>
                            <p className="wd-30 txt-right">₹ {billTotal}</p>
                        </div>
                        <div className="bill-row">
                            <p className="gray-txt wd-70">Shipping </p>
                            <p className="wd-30 txt-right">Free</p>
                        </div>
                        <div className="bill-row total-row">
                            <p className="wd-70">Total </p>
                            <p className="wd-30 txt-right">₹ {billTotal}</p>
                        </div>

                        <p className="small-txt">Promo Code</p>
                        <div className="promo-form">
                            <input type="text" />
                            <button className="apply-btn">Apply</button>
                        </div>

                        <button className="procced-btn"><FaLongArrowAltRight size={20} /> Procced to Pay</button>
                    </div>

                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmPopup && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Are you sure to <u>remove all</u> books from cart?</h3>
                        <div className="modal-buttons">
                            <button className="yes-btn" onClick={handleRemoveAllCart}>Yes</button>
                            <button className="no-btn" onClick={() => setShowConfirmPopup(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}