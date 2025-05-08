import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`; // Update with your backend URL

// Get all books
export const fetchAllBooks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/allbooks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // assuming response structure: { status, message, data }
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw new Error("Failed to fetch books");
  }
};
// Get all books
export const fetchWishListBooks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/wishListBooks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // assuming response structure: { status, message, data }
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw new Error("Failed to fetch books");
  }
};
// Get all books
export const fetchCartListBooks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/cartListBooks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // assuming response structure: { status, message, data }
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw new Error("Failed to fetch books");
  }
};

// Get a book by ID
export const fetchBookById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/allbooks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw new Error("Failed to fetch the book");
  }
};

// Create a new book
export const createBook = async (bookData) => {
  try {
    const response = await axios.post(BASE_URL, bookData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Failed to create book");
  }
};

// Update a book
export const updateBook = async (id, updatedFields) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedFields, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error);
    throw new Error("Failed to update book");
  }
};

// Delete a book
export const deleteBook = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw new Error("Failed to delete book");
  }
};
