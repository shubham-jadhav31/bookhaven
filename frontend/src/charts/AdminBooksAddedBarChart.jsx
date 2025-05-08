// AdminBooksAddedBarChart.jsx
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', books: 5 },
  { month: 'Feb', books: 15 },
  { month: 'Mar', books: 8 },
  { month: 'Apr', books: 20 },
  { month: 'May', books: 12 },
];

export const AdminBooksAddedBarChart = () => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const getBooksAddedInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/getBooksAddedPerMonth`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('BooksAddedInfo:', data.data);
        setBookData(data.data);
      } catch (err) {
        console.error('Error fetching Books Added Info:', err);
      }
    };

    getBooksAddedInfo();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={bookData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="books" fill="#82ca9d" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
};

