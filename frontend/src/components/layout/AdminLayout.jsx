import { Outlet, Link } from "react-router-dom";
import "./../../Admin.css"; // <- Import your separate CSS file here
import { TiHome } from "react-icons/ti";
import { ImBooks } from "react-icons/im";
import { MdNoteAdd } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav className="admin-nav">
          <ul>
            <li>
              <Link to="/admin" className="admin-link"><TiHome className="mt-4" size={20} /> Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/books" className="admin-link"><ImBooks className="mt-4" size={20} /> Manage Books</Link>
            </li>
            <li>
              <Link to="/admin/add-books" className="admin-link"><MdNoteAdd className="mt-4" size={20} /> Add Books</Link>
            </li>
            {/* Add more sidebar links here */}
          </ul>
        </nav>

        {/* Back Button */}
        <div className="admin-back-btn">
          <Link to="/" className="admin-link">
            <IoArrowBack size={18} /> Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
};
