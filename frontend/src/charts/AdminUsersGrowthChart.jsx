// AdminUsersGrowthChart.jsx
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', users: 10 },
  { month: 'Feb', users: 30 },
  { month: 'Mar', users: 50 },
  { month: 'Apr', users: 70 },
  { month: 'May', users: 100 },
];

export const AdminUsersGrowthChart = () => {
  const [userCounts, setUserCounts] = useState({});

  useEffect(() => {
    const getUserCountInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/getUserCountInfo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            setUserCounts(data.data);
        } catch {
            console.log("Error fetching User Counts: ", err);
        }
    };
    getUserCountInfo();
}, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={userCounts}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={1.5} />
      </LineChart>
    </ResponsiveContainer>
  );
};
