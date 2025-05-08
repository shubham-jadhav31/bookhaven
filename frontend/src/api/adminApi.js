import axios from "axios";

const ADMIN_URL = `${import.meta.env.VITE_API_URL}/admin`; // Update with your backend URL

// Fetch All Users
export const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Requested for User Info ----");
      const res = await axios.get(`${ADMIN_URL}/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API got this: ", res);
      return res.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { message: "Error", data: [] };
    }
  };

  export const fetchAllCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${ADMIN_URL}/getAllCartItems`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return { message: "Error", data: [] };
    }
  };
  
  export const fetchAllWishItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${ADMIN_URL}/getAllWishItems`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return { message: "Error", data: [] };
    }
  };
  
  export const fetchAllOrderItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${ADMIN_URL}/getAllOrders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return { message: "Error", data: [] };
    }
  };

  // Delete by Id 
    export const deleteBookById = async (bookId) => {
      const token = localStorage.getItem("token");
      if(token){
        console.log("Token: ", token);
      } else {
        console.log("No token found in local storage");
      }

      const response = await fetch(`${ADMIN_URL}/deleteBookById/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
      throw new Error("Failed to delete book");
      }
  
      return await response.json();
    };
    
    export const deleteUserById = async (userId) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${ADMIN_URL}/deleteUserById/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
      throw new Error("Failed to delete book");
      }
  
      return await response.json();
    };
    
    export const deleteCartItemById = async (cartId) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${ADMIN_URL}/deleteCartItemById/${cartId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
      throw new Error("Failed to delete book");
      }
  
      return await response.json();
    };
    
    export const deleteWishItemById = async (wishId) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${ADMIN_URL}/deleteCartItemById/${wishId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
      throw new Error("Failed to delete book");
      }
  
      return await response.json();
    };
    
    export const deleteOrderItemById = async (orderId) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${ADMIN_URL}/deleteOrderItemById/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
      throw new Error("Failed to delete book");
      }
  
      return await response.json();
    };
  
  