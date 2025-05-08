import { addBookService, addBooksInBulkService, getAllCartService, getAllCountService, getAllOrdersService, getAllUserService, getAllWishService, getBookGenreInfoService, getBooksAddedPerMonthService, getUserChartInfoService, getWishlistGrowthService } from "../models/adminModel.js";
import {
    getBookByIdService,
    getUserByIdService,
    getWishItemByIdService,
    getCartItemByIdService,
    getOrderItemByIdService,
    updateBookByIdService,
    updateUserByIdService,
    updateWishItemByIdService,
    updateCartItemByIdService,
    updateOrderItemByIdService,
  } from "../models/adminModel.js";
import {
    deleteBookByIdService,
    deleteUserByIdService,
    deleteWishItemByIdService,
    deleteCartItemByIdService,
    deleteOrderItemByIdService
  } from '../models/adminModel.js';

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const getAllCount = async(req,res, next) => {
    try {
        const counts = await getAllCountService();
        handleResponse(res, 200, "All stats gathered successfully", counts);
    } catch(err) {
        next(err);
    }
};

export const getAllUsers = async (req, res) => {
    try {
      const result = await getAllUserService();
      handleResponse(res, 200, "Fetched All Users", result);
    } catch (error) {
        next(err);
    }
};

export const getAllCartItems = async (req, res, next) => {
    try {
      const result = await getAllCartService();
      handleResponse(res, 200, "Fetched All Cart Items", result);
    } catch (err) {
      next(err);
    }
};

export const getAllWishItems = async (req, res, next) => {
    try {
      const result = await getAllWishService();
      handleResponse(res, 200, "Fetched All Cart Items", result);
    } catch (err) {
      next(err);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
      const orders = await getAllOrdersService();
      handleResponse(res, 200, "Fetched All Orders", orders);
    } catch (err) {
      next(err);
    }
  };

// ------------ Chart Controllers ------------

export const getUserChartInfo = async(req,res, next) => {
    try {
        const counts = await getUserChartInfoService();
        handleResponse(res, 200, "All User count stats gathered successfully", counts);
    } catch(err) {
        next(err);
    }
};

export const getBookGenreInfo = async(req,res, next) => {
    try {
        const counts = await getBookGenreInfoService();
        handleResponse(res, 200, "All Genre count stats gathered successfully", counts);
    } catch(err) {
        next(err);
    }
};

export const getBooksAddedPerMonth = async(req,res, next) => {
    try {
        const counts = await getBooksAddedPerMonthService();
        handleResponse(res, 200, "Records gathered successfully", counts);
    } catch(err) {
        next(err);
    }
};

export const getWishlistGrowth = async (req, res) => {
    try {
      const data = await getWishlistGrowthService();
      res.json({ data });
    } catch (err) {
      console.error("Error fetching Wishlist Growth: ", err);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

//   Edit and Update Controller 
  
  // Fetch entities by ID
  export const getBookById = async (req, res, next) => {
    try {
      const book = await getBookByIdService(req.params.bookId);
      if (!book) return handleResponse(res, 404, 'Book not found');
      handleResponse(res, 200, 'Book fetched successfully', book);
    } catch (err) {
      next(err);
    }
  };
  
  export const getUserById = async (req, res, next) => {
    try {
      const user = await getUserByIdService(req.params.userId);
      if (!user) return handleResponse(res, 404, 'User not found');
      handleResponse(res, 200, 'User fetched successfully', user);
    } catch (err) {
      next(err);
    }
  };
  
  export const getWishItemById = async (req, res, next) => {
    try {
      const wish = await getWishItemByIdService(req.params.wishId);
      if (!wish) return handleResponse(res, 404, 'Wishlist item not found');
      handleResponse(res, 200, 'Wishlist item fetched successfully', wish);
    } catch (err) {
      next(err);
    }
  };
  
  export const getCartItemById = async (req, res, next) => {
    try {
      const cartItem = await getCartItemByIdService(req.params.cartId);
      if (!cartItem) return handleResponse(res, 404, 'Cart item not found');
      handleResponse(res, 200, 'Cart item fetched successfully', cartItem);
    } catch (err) {
      next(err);
    }
  };
  
  export const getOrderItemById = async (req, res, next) => {
    try {
      const order = await getOrderItemByIdService(req.params.orderId);
      if (!order) return handleResponse(res, 404, 'Order not found');
      handleResponse(res, 200, 'Order fetched successfully', order);
    } catch (err) {
      next(err);
    }
  };
  
  // Update entities by ID
  export const updateBookById = async (req, res, next) => {
    try {
      const updated = await updateBookByIdService(req.params.bookId, req.body);
      if (!updated) return handleResponse(res, 404, 'Book not found');
      handleResponse(res, 200, 'Book updated successfully', updated);
    } catch (err) {
      next(err);
    }
  };
  
  export const updateUserById = async (req, res, next) => {
    try {
      const updated = await updateUserByIdService(req.params.userId, req.body);
      if (!updated) return handleResponse(res, 404, 'User not found');
      handleResponse(res, 200, 'User updated successfully', updated);
    } catch (err) {
      next(err);
    }
  };
  
  export const updateWishItemById = async (req, res, next) => {
    try {
      const updated = await updateWishItemByIdService(req.params.wishId, req.body);
      if (!updated) return handleResponse(res, 404, 'Wishlist item not found');
      handleResponse(res, 200, 'Wishlist item updated successfully', updated);
    } catch (err) {
      next(err);
    }
  };
  
  export const updateCartItemById = async (req, res, next) => {
    try {
      const updated = await updateCartItemByIdService(req.params.cartId, req.body);
      if (!updated) return handleResponse(res, 404, 'Cart item not found');
      handleResponse(res, 200, 'Cart item updated successfully', updated);
    } catch (err) {
      next(err);
    }
  };
  
  export const updateOrderItemById = async (req, res, next) => {
    try {
      const updated = await updateOrderItemByIdService(req.params.orderId, req.body);
      if (!updated) return handleResponse(res, 404, 'Order not found');
      handleResponse(res, 200, 'Order updated successfully', updated);
    } catch (err) {
      next(err);
    }
  };

  // Delete Controller
  export const deleteBookById = async (req, res, next) => {
    try {
      await deleteBookByIdService(req.params.bookId);
      handleResponse(res, 200, 'Book deleted successfully');
    } catch (err) {
      next(err);
    }
  };
  
  export const deleteUserById = async (req, res, next) => {
    try {
      await deleteUserByIdService(req.params.userId);
      handleResponse(res, 200, 'User deleted successfully');
    } catch (err) {
      next(err);
    }
  };
  
  export const deleteWishItemById = async (req, res, next) => {
    try {
      await deleteWishItemByIdService(req.params.wishId);
      handleResponse(res, 200, 'Wishlist item deleted successfully');
    } catch (err) {
      next(err);
    }
  };
  
  export const deleteCartItemById = async (req, res, next) => {
    try {
      await deleteCartItemByIdService(req.params.cartId);
      handleResponse(res, 200, 'Cart item deleted successfully');
    } catch (err) {
      next(err);
    }
  };
  
  export const deleteOrderItemById = async (req, res, next) => {
    try {
      await deleteOrderItemByIdService(req.params.orderId);
      handleResponse(res, 200, 'Order item deleted successfully');
    } catch (err) {
      next(err);
    }
  };

  // Add Book in Bulk using CSV 
  export const addBooksInBulk = async (req, res, next) => {
    try {
        const booksArray = req.body.books; // assuming { books: [ {title, author, genre, price, ...}, {...}, ... ] }
        if (!Array.isArray(booksArray) || booksArray.length === 0) {
            return res.status(400).json({ message: "No books provided" });
        }

        const insertedBooks = await addBooksInBulkService(booksArray);
        res.status(201).json({
            message: "Books added successfully",
            data: insertedBooks
        });
    } catch (err) {
        console.error("Error adding books:", err);
        next(err);
    }
  };
  
  export const addBook = async (req, res) => {
    try {
      const {
        title,
        author,
        description,
        genre,
        price,
        stock,
        rating,
        language,
        publisher,
        isbn,
        format,
        pages,
      } = req.body;
  
      // Basic validation
      if (!title || !author || !price) {
        return res.status(400).json({ error: 'Title, author, and price are required' });
      }
  
      // You can add more validation here for optional fields if necessary
      const book = await addBookService({
        title,
        author,
        description,
        genre,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        rating: rating ? parseFloat(rating) : null, // Optional field
        language,
        publisher,
        isbn,
        format,
        pages: pages ? parseInt(pages) : null, // Optional field
      });
  
      res.status(201).json(book);
    } catch (err) {
      console.error("Error adding book:", err);
      res.status(500).json({ error: "Failed to add book" });
    }
  };
  