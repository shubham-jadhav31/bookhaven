import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#FF6666', '#AA66CC', '#99CC00', '#FF9933',
  '#FF6699', '#00CC99', '#33CCCC', '#FF6666',
  '#9966CC', '#FF9933'
];

export const AdminBooksGenrePieChart = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const getBookGenreInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/getBookGenreInfo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await response.json();
        console.log("GenreInfo: ", data.data);
        // Important: convert total_books to number
        const fixedData = data.data.map(item => ({
          name: item.name,
          total_books: Number(item.total_books)
        }));
        setInfo(fixedData);
      } catch (err) { // fixed missing error
        console.log("Error fetching Genre Info: ", err);
      }
    };
    getBookGenreInfo();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={info}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="total_books"
          label
        >
          {info.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
