import pool from "../config/db.js";

// READ - Get all books
export const getAllBooksService = async () => {
    const result = await pool.query("SELECT * FROM books ORDER BY id");
    return result.rows;
};


// -------- Wishlist -----------
export const getWishListBooks_Service = async (user_id) => {
    const result = await pool.query(`
        SELECT
            w.id AS wishlist_id,
            b.id AS id,
            b.title,
            b.author,
            b.price,
            CASE 
                WHEN c.id IS NOT NULL THEN true
                ELSE false
            END AS in_cart
        FROM wishlist w
        JOIN books b ON w.book_id = b.id
        LEFT JOIN cart c ON c.book_id = b.id AND c.user_id = w.user_id
        WHERE w.user_id = $1
    `, [user_id]);

    return result.rows;
};


export const addToWishlist_Service = async (user_id, book_id) => {
    return await pool.query(`
        INSERT INTO wishlist (user_id, book_id)
        VALUES ($1, $2)
        ON CONFLICT ON CONSTRAINT wishlist_user_id_book_id_key DO NOTHING
        RETURNING *;
    `, [user_id, book_id]);
};

export const removeFromWishlist_Service = async (user_id, book_id) => {
    return await pool.query(`
        DELETE FROM wishlist
        WHERE user_id = $1 AND book_id = $2
        RETURNING *;
    `, [user_id, book_id]);
};

export const removeFromWishlist_all_Service = async (user_id, book_id) => {
    return await pool.query(`
        DELETE FROM wishlist
        WHERE user_id = $1
        RETURNING *;
    `, [user_id]);
};

export const isBookInWishlist_Service = async (user_id, book_id) => {
    return await pool.query(
        `SELECT * FROM wishlist WHERE user_id = $1 AND book_id = $2`,
        [user_id, book_id]
    );
};

// ---------- Cart -----------
export const addOrUpdateCartService = async (userId, bookId, quantity) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const checkExist = await client.query(
      'SELECT quantity FROM cart WHERE user_id = $1 AND book_id = $2',
      [userId, bookId]
    );

    if (checkExist.rows.length > 0) {
      // Update quantity
      await client.query(
        'UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND book_id = $3',
        [quantity, userId, bookId]
      );
    } else {
      // Insert new record
      await client.query(
        'INSERT INTO cart (user_id, book_id, quantity) VALUES ($1, $2, $3)',
        [userId, bookId, quantity]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const removeFromCartService = async (userId, bookId) => {
  await pool.query(
    'DELETE FROM cart WHERE user_id = $1 AND book_id = $2',
    [userId, bookId]
  );
};

export const removeFromCartService_all = async (userId) => {
  await pool.query(
    'DELETE FROM cart WHERE user_id = $1',
    [userId]
  );
};

export const isBookInCart_Service = async (user_id, book_id) => {
    return await pool.query(
        `SELECT * FROM cart WHERE user_id = $1 AND book_id = $2`,
        [user_id, book_id]
    );
};

// Edit Profile Services 

// export const getProfileInfoService = async (user_id) => {
//     return await pool.query(
//         `SELECT * FROM users WHERE id = $1`,
//         [user_id]
//     );
// };

export const getProfileInfoService = async (user_id) => {
    try {
      const result = await pool.query(
        `SELECT id, name, email, phone, location, education, occupation, interests, member_since
         FROM users
         WHERE id = $1`,
        [user_id]
      );
      return result;
    } catch (error) {
      console.error("Error in getProfileInfoService:", error);
      throw error;
    }
  };

export const updateProfileInfoService = async (user_id, profile) => {
    const { name, email, phone, location, education, occupation, interests } = profile;
  
    return await pool.query(
      `UPDATE users 
       SET name = $1, email = $2, phone = $3, location = $4, 
           education = $5, occupation = $6, interests = $7
       WHERE id = $8
       RETURNING *`,
      [name, email, phone, location, education, occupation, interests, user_id]
    );
  };
  



// READ - Get all books
export const getCartListBooks_Service = async (user_id) => {
    // console.log("user model -----| user_id: ", user_id);
    const result = await pool.query(`
        SELECT 
            c.id AS cart_id,
            b.id AS id,
            b.title,
            b.author,
            b.price,
            c.quantity
        FROM cart c
        JOIN books b ON c.book_id = b.id
        WHERE c.user_id = $1`, [user_id]);
    // console.log("user model -----| Cart count: ", result.rows);

    return result.rows;
};

// READ - Get a single book by ID
export const getBookByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0]; // returns undefined if not found
};

// SEARCH - Find books by title (case-insensitive, partial match)
export const searchBooksByTitleService = async (title) => {
    const result = await pool.query(
        "SELECT * FROM books WHERE LOWER(title) LIKE LOWER($1)",
        [`%${title}%`]
    );
    return result.rows;
};

// CREATE - Add a new book
export const createBookService = async ({ title, author, price, genre, rating, stock, cover_image, description }) => {
    const result = await pool.query(
        `INSERT INTO books 
        (title, author, price, genre, rating, stock, cover_image, description) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`,
        [title, author, price, genre, rating, stock, cover_image, description]
    );
    return result.rows[0];
};

// UPDATE - Update a book by ID
// export const updateBookService = async (id, { title, author, price, genre, rating, stock, cover_image, description }) => {
//     const result = await pool.query(
//         `UPDATE books 
//          SET title = $1, author = $2, price = $3, genre = $4, rating = $5, 
//              stock = $6, cover_image = $7, description = $8
//          WHERE id = $9
//          RETURNING *`,
//         [title, author, price, genre, rating, stock, cover_image, description, id]
//     );
//     return result.rows[0];
// };

export const updateBookService = async (id, fieldsToUpdate) => {
    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) {
        throw new Error("No fields provided for update");
    }

    const values = [];
    const setClause = keys
        .map((key, index) => {
            values.push(fieldsToUpdate[key]);
            return `${key} = $${index + 1}`;
        })
        .join(", ");

    // Add the ID at the end for the WHERE clause
    values.push(id);

    const query = `
        UPDATE books
        SET ${setClause}
        WHERE id = $${values.length}
        RETURNING *;
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
};


// DELETE - Delete a book by ID
export const deleteBookService = async (id) => {
    const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
    return result.rows[0]; // return the deleted book details
};
