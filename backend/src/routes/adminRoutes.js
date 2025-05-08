import express from "express";
import { addBook, addBooksInBulk, deleteBookById, deleteCartItemById, deleteOrderItemById, deleteUserById, deleteWishItemById, getAllCartItems, getAllCount, getAllOrders, getAllUsers, getAllWishItems, getBookById, getBookGenreInfo, getBooksAddedPerMonth, getCartItemById, getOrderItemById, getUserById, getUserChartInfo, getWishItemById, getWishlistGrowth, updateBookById, updateCartItemById, updateOrderItemById, updateUserById, updateWishItemById } from "../controllers/adminController.js";

const adminRouter = express.Router();

// Count Stats
adminRouter.get("/getAllCount", getAllCount);

// Chart Routes
adminRouter.get("/getUserCountInfo", getUserChartInfo);
adminRouter.get("/getBookGenreInfo", getBookGenreInfo);
adminRouter.get("/getBooksAddedPerMonth", getBooksAddedPerMonth);
adminRouter.get("/getWishlistGrowthInfo", getWishlistGrowth);

// Table Routes
adminRouter.get("/getAllUsers", getAllUsers);
adminRouter.get("/getAllCartItems", getAllCartItems);
adminRouter.get("/getAllWishItems", getAllWishItems);
adminRouter.get("/getAllOrders", getAllOrders);

// Action Routes
// Get record by id
adminRouter.get("/getBookById/:bookId", getBookById);
adminRouter.get("/getUserById/:userId", getUserById);
adminRouter.get("/getWishItemById/:wishId", getWishItemById);
adminRouter.get("/getCartItemById/:cartId", getCartItemById);
adminRouter.get("/getOrderItemById/:orderId", getOrderItemById);
// Update record by id
adminRouter.put("/updateBookById/:bookId", updateBookById);
adminRouter.put("/updateUserById/:userId", updateUserById);
adminRouter.put("/updateWishItemById/:wishId", updateWishItemById);
adminRouter.put("/updateCartItemById/:cartId", updateCartItemById);
adminRouter.put("/updateOrderItemById/:orderId", updateOrderItemById);
// Delete record by id
adminRouter.delete("/deleteBookById/:bookId", deleteBookById);
adminRouter.delete("/deleteUserById/:userId", deleteUserById);
adminRouter.delete("/deleteWishItemById/:wishId", deleteWishItemById);
adminRouter.delete("/deleteCartItemById/:cartId", deleteCartItemById);
adminRouter.delete("/deleteOrderItemById/:orderId", deleteOrderItemById);

// Add Books in Bulk
adminRouter.post("/bulkAddBooks", addBooksInBulk);
adminRouter.post('/addBook', addBook);


export default adminRouter;