import { 
    createBookService, 
    deleteBookService, 
    getAllBooksService, 
    getBookByIdService, 
    getCartListBooks_Service, 
    getProfileInfoService, 
    getWishListBooks_Service, 
    updateBookService, 
    updateProfileInfoService} from "../models/userModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createBooks = async (req, res, next) => {
    const { title, author, price, genre, rating, stock, cover_image, description } = req.body;

    if (!title || !author || !price) {
        return res.status(400).json({ error: "title, author, and price are required fields." });
    }    

    try {
        const newBook = await createBookService({
            title,
            author,
            price,
            genre,
            rating,
            stock,
            cover_image,
            description
        });

        handleResponse(res, 201, "Book created successfully", newBook);
    } catch (err) {
        next(err);
    }
};


export const getAllBooks = async(req, res, next) => {
    try {
        const books = await getAllBooksService();
        handleResponse(res, 200, "All Books feteched successfully", books);
    } catch(err) {
        next(err);
    }
};

export const getWishListBooks = async(req,res, next) => {
    try {
        const books = await getWishListBooks_Service(req.params.user_id);
        handleResponse(res, 200, "Wishlist feteched successfully", books);
    } catch(err) {
        next(err);
    }
};

// export const getCartListBooks = async(req,res, next) => {
//     try {
//         console.log("user controller | user_id: ", req.params.user_id);
//         const books = await getCartListBooks_Service(req.params.user_id);
//         handleResponse(res, 200, "All Books feteched successfully", books);
//         console.log("user controller | Cart count: ", books.length);
//     } catch(err) {
//         next(err);
//     }
// };

export const getBookById = async(req,res, next) => {
    try {
        const books = await getBookByIdService(req.params.id);
        if(!books) return handleResponse(res, 404, "Book not found");
        handleResponse(res, 200, "Books fetched successfully", books);
    } catch(err) {
        next(err);
    }
};

export const updateBook = async (req, res, next) => {
    const fieldsToUpdate = req.body;

    try {
        const updatedBook = await updateBookService(req.params.id, fieldsToUpdate);
        if (!updatedBook) return handleResponse(res, 404, "Book not found");
        handleResponse(res, 200, "Book updated successfully", updatedBook);
    } catch (err) {
        next(err);
    }
};


export const deleteBook = async(req,res, next) => {
    try {
        const deletedBooks = await deleteBookService(req.params.id);
        if(!deletedBooks) return handleResponse(res, 404, "Book not found");
        handleResponse(res, 200, "Books deleted successfully", deletedBooks);
    } catch(err) {
        next(err);
    }
};

export const getProfileInfo = async(req,res, next) => {
    const userId = req.user.userId;
    try {
        const info = await getProfileInfoService(userId);
        handleResponse(res, 200, "Profile Info feteched successfully", info.rows[0]);
    } catch(err) {
        next(err);
    }
};

export const updateProfileInfo = async (req, res, next) => {
    const userId = req.user.userId;
    const { name, email, phone, location, education, occupation, interests } = req.body;
  
    try {
      const result = await updateProfileInfoService(userId, {
        name,
        email,
        phone,
        location,
        education,
        occupation,
        interests,
      });
      handleResponse(res, 200, "Profile updated successfully", result.rows[0]);
    } catch (err) {
      next(err);
    }
  };
  