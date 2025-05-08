// AdminWishlistGrowthChart.jsx
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', wishlistItems: 5 },
  { month: 'Feb', wishlistItems: 12 },
  { month: 'Mar', wishlistItems: 18 },
  { month: 'Apr', wishlistItems: 25 },
  { month: 'May', wishlistItems: 30 },
];

export const AdminWishlistGrowthChart = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const getWishlistGrowthInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/getWishlistGrowthInfo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("WishlistGrowthInfo: ", data.data);
        setInfo(data.data);
      } catch (err) {
        console.log("Error fetching Wishlist Growth Info: ", err);
      }
    };

    getWishlistGrowthInfo();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={info}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="wishlistitems" stroke="#f5c433" strokeWidth={1.5} />
      </LineChart>
    </ResponsiveContainer>
  );
};
