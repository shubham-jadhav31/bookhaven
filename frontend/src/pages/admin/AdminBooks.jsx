import React, { useState } from 'react';
import { BookTable } from '../../components/adminComps/bookTable';
import { UserTable } from '../../components/adminComps/UserTable';
import { CartTable } from '../../components/adminComps/CartTable';
import WishlistTable from '../../components/adminComps/WishlistTable';
import OrderTable from '../../components/adminComps/OrderTable';


export const AdminBooks = () => {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <div className="admin-books-container">
      <h2 className="admin-books-title">Manage Library</h2>

      {/* Tabs */}
      <div className="admin-tabs">
        <button className={activeTab === 'books' ? 'tab active' : 'tab'} onClick={() => setActiveTab('books')}>Books</button>
        <button className={activeTab === 'users' ? 'tab active' : 'tab'} onClick={() => setActiveTab('users')}>Users</button>
        <button className={activeTab === 'cart' ? 'tab active' : 'tab'} onClick={() => setActiveTab('cart')}>Cart</button>
        <button className={activeTab === 'wishlist' ? 'tab active' : 'tab'} onClick={() => setActiveTab('wishlist')}>Wishlist</button>
        <button className={activeTab === 'orders' ? 'tab active' : 'tab'} onClick={() => setActiveTab('orders')}>Orders</button>
      </div>

      {/* Conditional Tables */}
      {activeTab === 'books' && <BookTable />}

      {activeTab === 'users' && <UserTable />}

      {activeTab === 'cart' && <CartTable />}

      {activeTab === 'wishlist' && <WishlistTable />}
      
      {activeTab === 'orders' && <OrderTable />}

    </div>
  );
};
