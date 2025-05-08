// controllers/wishlistController.js
import {
    getWishListBooks_Service,
    addToWishlist_Service,
    removeFromWishlist_Service,
    isBookInWishlist_Service,
    removeFromWishlist_all_Service
  } from '../models/userModel.js';
  
  export const getWishlist = async (req, res, next) => {
    const userId = req.user.userId;         // assume you have auth middleware
    // const userId = 1;         // assume you have auth middleware
    const items  = await getWishListBooks_Service(userId);
    res.json({ success: true, data: items, message: 'Successfully fetched wishlist' });
  };
  
  export const addToWishlist = async (req, res, next) => {
    const userId = req.user.userId;
    // const userId = 1;
    const { bookId } = req.params;
    await addToWishlist_Service(userId, bookId);
    res.json({ success: true, message: 'Added to wishlist' });
  };
  
  export const removeFromWishlist = async (req, res, next) => {
    const userId = req.user.userId;
    // const userId = 1;
    const { bookId } = req.params;
    await removeFromWishlist_Service(userId, bookId);
    res.json({ success: true, message: 'Removed from wishlist' });
  };

  export const removeFromWishlist_all = async (req, res, next) => {
    const userId = req.user.userId;
    // const userId = 1;
    const { bookId } = req.params;
    await removeFromWishlist_all_Service(userId, bookId);
    res.json({ success: true, message: 'Removed from wishlist' });
  };

  export const isBookInWishlist = async (req, res, next) => {
    const userId = req.user.userId;
    // const userId = parseInt(req.params.user_id);
    const bookId = parseInt(req.params.book_id);
  
    try {
      const result = await isBookInWishlist_Service(userId, bookId);
  
      if (result.rows.length > 0) {
        res.json({ wished: true });
      } else {
        res.json({ wished: false });
      }
    } catch (err) {
      console.error('Error checking wishlist:', err);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  