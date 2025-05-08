import pool from "../config/db.js";

// READ - Get all books
export const getAllCountService = async () => {
    console.log("From adminModel: ----");
    const result = await pool.query(`SELECT 
        (SELECT COUNT(*) FROM users) AS users_count,
        (SELECT COUNT(*) FROM books) AS books_count,
        (SELECT COUNT(*) FROM cart) AS cart_count,
        (SELECT COUNT(*) FROM wishlist) AS wishlist_count,
        (SELECT COUNT(*) FROM orders) AS orders_count,
        (SELECT COUNT(*) FROM reviews) AS review_count;
    `);
    console.log("Rows: ", result.rows);
    return result.rows;
};

export const getUserChartInfoService = async () => {
    const result = await pool.query(`
        SELECT
            to_char(date_trunc('month', member_since), 'Mon YYYY') AS month,
            COUNT(*) AS users
        FROM users
        GROUP BY date_trunc('month', member_since)
        ORDER BY date_trunc('month', member_since);

    `);
    console.log("User Info: ", result.rows);
    return result.rows;
}

export const getBookGenreInfoService = async () => {
    const result = await pool.query(`
        SELECT
            genre as name,
            COUNT(*) AS total_books
        FROM books
        GROUP BY genre
        ORDER BY total_books DESC;
    `);
    console.log("Genre Info: ", result.rows);
    return result.rows;
}

export const getBooksAddedPerMonthService = async () => {
    const result = await pool.query(`
        SELECT 
            TO_CHAR(created_at, 'Mon') AS month,
            COUNT(*) AS books
        FROM 
            books
        GROUP BY 
            TO_CHAR(created_at, 'Mon')
        ORDER BY 
        MIN(created_at);
    `);
    console.log("Added Book Info: ", result.rows);
    return result.rows;
}

export const getWishlistGrowthService = async () => {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(created_at, 'Mon') AS month,
        COUNT(*) AS wishlistItems
      FROM 
        wishlist
      GROUP BY 
        TO_CHAR(created_at, 'Mon')
      ORDER BY 
        MIN(created_at);
    `);
  
    return result.rows;
  };

  export const getAllUserService = async () => {
    const result = await pool.query(`
      SELECT id, name, email, phone, location, member_since, is_admin 
      FROM users 
      ORDER BY id
    `);
  
    return result.rows;
  };
  
  export const getAllCartService = async () => {
    const result = await pool.query(`
        SELECT
          cart.id AS cart_id,
          users.id AS user_id,
          users.name AS user_name,
          users.email AS email,
          books.id AS book_id,
          books.title AS book_title,
          books.author,
          books.price,
          cart.quantity,
          (books.price * cart.quantity) AS total_price
        FROM cart
        JOIN users ON cart.user_id = users.id
        JOIN books ON cart.book_id = books.id
      `);
    return result.rows;
  };

  export const getAllWishService = async () => {
    const result = await pool.query(`
        SELECT
          wishlist.id AS wishlist_id,
          users.id AS user_id,
          users.name AS user_name,
          users.email AS email,
          books.id AS book_id,
          books.title AS book_title,
          books.author,
          books.price,
          wishlist.created_at
        FROM wishlist
        JOIN users ON wishlist.user_id = users.id
        JOIN books ON wishlist.book_id = books.id
      `);
      
      return result.rows;
  };

  export const getAllOrdersService = async () => {
    const result = await pool.query(`
      SELECT
        o.id                         AS order_id,
        u.name                       AS user_name,
        u.email                      AS user_email,
        o.total                      AS total_amount,
        o.status                     AS status,
        TO_CHAR(o.created_at, 'DD Mon YYYY, HH24:MI') AS created_at
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC;
    `);
    return result.rows;
  };


  // Edit and Update models -------------------------

  // Generic helper for dynamic updates
  const dynamicUpdate = async (table, idField, id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) throw new Error('No fields provided for update');
    
    const sets = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');
    const values = keys.map(key => fields[key]);
    values.push(id);
  
    const sql = `UPDATE ${table} SET ${sets} WHERE ${idField} = $${values.length} RETURNING *`;
    const result = await pool.query(sql, values);
    return result.rows[0];
  };
  
  
  // Fetch services
  export const getBookByIdService = async (id) => {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  };
  export const getUserByIdService = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  };
  export const getWishItemByIdService = async (id) => {
    const result = await pool.query('SELECT * FROM wishlist WHERE id = $1', [id]);
    return result.rows[0];
  };
  export const getCartItemByIdService = async (id) => {
    const result = await pool.query('SELECT * FROM cart WHERE id = $1', [id]);
    return result.rows[0];
  };
  export const getOrderItemByIdService = async (id) => {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
  };
  
  // Update services
  export const updateBookByIdService = (id, fields) =>
    dynamicUpdate('books', 'id', id, fields);
  export const updateUserByIdService = (id, fields) =>
    dynamicUpdate('users', 'id', id, fields);
  export const updateWishItemByIdService = (id, fields) =>
    dynamicUpdate('wishlist', 'id', id, fields);
  export const updateCartItemByIdService = (id, fields) =>
    dynamicUpdate('cart', 'id', id, fields);
  export const updateOrderItemByIdService = (id, fields) =>
    dynamicUpdate('orders', 'id', id, fields);
  

  // Delete sevices
  export const deleteBookByIdService = async (bookId) => {
    await pool.query('DELETE FROM books WHERE id = $1', [bookId]);
  };
  
  export const deleteUserByIdService = async (userId) => {
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
  };
  
  export const deleteWishItemByIdService = async (wishId) => {
    await pool.query('DELETE FROM wishlist WHERE id = $1', [wishId]);
  };
  
  export const deleteCartItemByIdService = async (cartId) => {
    await pool.query('DELETE FROM cart WHERE id = $1', [cartId]);
  };
  
  export const deleteOrderItemByIdService = async (orderId) => {
    await pool.query('DELETE FROM orders WHERE id = $1', [orderId]);
  };

  export const addBooksInBulkService = async (books) => {
    let client;
    try {
        client = await pool.connect();  // Get a client from the pool
        await client.query('BEGIN');  // Start a transaction

        const insertedBooks = [];

        for (const book of books) {
            const { title, author, genre, price, description } = book;
            const result = await client.query(`
                INSERT INTO books (title, author, genre, price, description, created_at)
                VALUES ($1, $2, $3, $4, $5, NOW())
                RETURNING *;
            `, [title, author, genre, price, description]);

            insertedBooks.push(result.rows[0]);
        }

        await client.query('COMMIT');  // Commit the transaction
        return insertedBooks;  // Return the list of inserted books
    } catch (error) {
        console.error("Error adding books in bulk: ", error);
        await client.query('ROLLBACK');  // Rollback the transaction on error
        throw error;  // Propagate the error to be handled by the controller
    } finally {
        client.release();  // Release the client back to the pool
    }
  };

  export const addBookService = async (bookData) => {
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
    } = bookData;
  
    const result = await pool.query(
      `INSERT INTO books (title, author, description, genre, price, stock, rating, language, publisher, isbn, format, pages, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
       RETURNING *;`,
      [
        title,
        author,
        description,
        genre,
        price,
        stock,
        rating,          // Optional field
        language,
        publisher,
        isbn,
        format,
        pages,           // Optional field
      ]
    );
  
    return result.rows[0];
  };
  
