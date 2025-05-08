import { data, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { AdminUsersGrowthChart } from "./../../charts/AdminUsersGrowthChart";
import { AdminBooksGenrePieChart } from "./../../charts/AdminBooksGenrePieChart";
import { AdminBooksAddedBarChart } from "./../../charts/AdminBooksAddedBarChart";
import { AdminWishlistGrowthChart } from "./../../charts/AdminWishlistGrowthChart";
import React, { useEffect, useState } from "react";

const lineChartData = [
  { month: 'Jan', books: 5 },
  { month: 'Feb', books: 8 },
  { month: 'Mar', books: 3 },
  { month: 'Apr', books: 10 },
  { month: 'May', books: 6 }
];

const pieChartData = [
  { name: 'Fiction', value: 400 },
  { name: 'Non-Fiction', value: 300 },
  { name: 'Sci-Fi', value: 300 },
  { name: 'Biography', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export const AdminDashboard = () => {
    const [counts, setCounts] = useState({});

    useEffect(() => {
        const fetchCounts = async () => {
            try {
              const token = localStorage.getItem("token");
                const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/getAllCount`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                const data = await response.json(); // Important!
                setCounts(data.data[0]);
            } catch (err) {
                console.error("Error fetching Counts:", err);
            }
        };
        
        fetchCounts();
    }, []);

    
  return (
    <div className="hero-div">
      <h1>Dashboard</h1>
      <p>Welcome to the Admin Panel. Manage your website from here!</p>

      <div className="stats-div">
        <div className="stats-row">
            <div className="stats-card">
                <h2 className="stats-tableName">Users</h2>
                <span className="stats-count">{counts.users_count}</span>
            </div>
            <div className="stats-card">
                <h2 className="stats-tableName">Books</h2>
                <span className="stats-count">{counts.books_count}</span>
            </div>
            <div className="stats-card">
                <h2 className="stats-tableName">Orders</h2>
                <span className="stats-count">{counts.orders_count}</span>
            </div>
        </div>
        <div className="stats-row">
            <div className="stats-card">
                <h2 className="stats-tableName">Wishlisted</h2>
                <span className="stats-count">{counts.wishlist_count}</span>
            </div>
            <div className="stats-card">
                <h2 className="stats-tableName">Cart</h2>
                <span className="stats-count">{counts.cart_count}</span>
            </div>
            <div className="stats-card">
                <h2 className="stats-tableName">Reviews</h2>
                <h2 className="stats-count">{counts.review_count}</h2>
            </div>
        </div>
     </div>

        
    <h2>Charts</h2>
    <div className="chart-div">
        {/* First Row */}
      <div className="chart-row">
        <div className="chart-cell">
          <h3>New Users Growth</h3>
          <AdminUsersGrowthChart />
        </div>
        <div className="chart-cell">
          <h3>Genre Distribution</h3>
          <AdminBooksGenrePieChart />
        </div>
      </div>

      {/* Second Row */}
      <div className="chart-row">
        <div className="chart-cell">
          <h3>Books Added</h3>
          <AdminBooksAddedBarChart />
        </div>
        <div className="chart-cell">
          <h3>Wishlist Growth</h3>
          <AdminWishlistGrowthChart />
        </div>
      </div>
    </div>
    </div>
  );
};
