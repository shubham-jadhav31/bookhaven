import { addOrUpdateCartService, getCartListBooks_Service, isBookInCart_Service, removeFromCartService, removeFromCartService_all } from '../models/userModel.js';

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
      status,
      message,
      data,
  });
};

export const getCartListBooks = async(req,res, next) => {
  try {
      // console.log("user controller | user_id: ", req.params.user_id);
      const books = await getCartListBooks_Service(req.user.userId);
      handleResponse(res, 200, "All Books feteched successfully", books);
      console.log("user controller | Cart count: ", books.length);
  } catch(err) {
      next(err);
  }
};

export const addOrUpdateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId, quantity } = req.body;
    // console.log(`Add/Update Cart | UserId: ${userId}, BookId: ${bookId}, | Quantity: ${quantity}`);
    await addOrUpdateCartService(userId, bookId, quantity);
    res.json({ message: 'Added to cart successfully' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.params;
    await removeFromCartService(userId, bookId);
    res.json({ message: 'Removed from cart successfully' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeFromCart_all = async (req, res) => {
  try {
    const userId = req.user.userId;
    // const { userId } = req.params;
    await removeFromCartService_all(userId);
    res.json({ message: 'Removed from cart successfully' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const isBookInCart = async (req, res, next) => {
  const userId = req.user.userId;
  // const userId = parseInt(req.params.user_id);
  const bookId = parseInt(req.params.book_id);

  try {
      const result = await isBookInCart_Service(userId, bookId);

      if (result.rows.length > 0) {
      res.json({ inCart: true });
      } else {
      res.json({ inCart: false });
      }
  } catch (err) {
      console.error('Error checking cart:', err);
      res.status(500).json({ success: false, message: 'Server Error' });
  }
};
