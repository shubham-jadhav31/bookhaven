import { NavLink, useNavigate } from "react-router-dom";
import { IoCart, IoLogOut } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useAuth } from "../../auth/AuthContext";

export const Headers = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };


    return (
        <header>
            <div className="container">
                <div className="grid navbar-grid">
                    <div className="Logo">
                        <NavLink to="/">
                            <h1 className="logo-h1">BookHaven</h1>
                        </NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink>
                            </li>
                            {/* <li>
                                <NavLink to="/books" className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink>
                            </li> */}
                            <li>
                                <NavLink to="/open_search" className={({ isActive }) => isActive ? 'active' : ''}>Open Search</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                            </li>
                            <li>
                                <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'active' : ''}><FaRegHeart size={21} /></NavLink>
                            </li>
                            <li>
                                <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}><IoCart size={23} /></NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}><IoPersonCircleSharp   size={26} /></NavLink>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="logout-btn">
                                    <IoLogOut size={26} />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};