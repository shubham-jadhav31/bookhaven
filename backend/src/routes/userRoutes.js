import express from "express";
import { 
    createBooks, 
    deleteBook, 
    getAllBooks, 
    getBookById, 
    getProfileInfo, 
    // getCartListBooks, 
    // getWishListBooks, 
    updateBook, 
    updateProfileInfo} from "../controllers/userController.js";
import { addToWishlist, getWishlist, isBookInWishlist, removeFromWishlist, removeFromWishlist_all } from "../controllers/wishlistController.js";
import { addOrUpdateCart, getCartListBooks, isBookInCart, removeFromCart, removeFromCart_all } from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// CRUD Book Routes
router.post("/addBook", createBooks);
router.get("/allBooks", getAllBooks);
router.get("/allBooks/:id", getBookById);
router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);

// Edit Profile Routes
router.get("/getProfileInfo", authMiddleware, getProfileInfo);
router.put("/updateProfile", authMiddleware, updateProfileInfo);


// Wishlist Routes
// router.get("/wishListBooks/:user_id", getWishListBooks);
router.get('/wishListBooks/', getWishlist);
router.post('/wishListBooks/:bookId', addToWishlist);
router.delete('/wishListBooks/:bookId', removeFromWishlist);
router.delete('/wishListBooks_all/', removeFromWishlist_all);
router.get('/wishListBooks/:book_id', isBookInWishlist);

// Cart Routes
router.get("/cartListBooks/", getCartListBooks);
router.post('/cart/', addOrUpdateCart);
router.delete('/cart/:bookId', removeFromCart);
router.delete('/cart_all/', removeFromCart_all);
router.get('/cart/:book_id', isBookInCart);


export default router;