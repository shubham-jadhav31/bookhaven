import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AdminRoute } from "./auth/AdminRoute";

import "./App.css";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Books } from "./pages/Books";
import { About } from "./pages/About";
import { ErrorPage } from "./pages/ErrorPage";
import { Contact } from "./pages/Contact";
import { OpenSearch } from "./pages/OpenSearch";
import { BookDetail } from "./pages/BookDetail";
import { BookInfo } from "./pages/BookInfo";
import { Wishlist } from "./pages/Wishlist";
import { Cart } from "./pages/Cart";
import { Profile } from "./pages/Profile";


// Admin pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminBooks } from "./pages/admin/AdminBooks";
import { AdminLayout } from "./components/layout/AdminLayout";
import EditBook from "./pages/admin/EditBook";
import EditUser from "./pages/admin/EditUser";
import EditWish from "./pages/admin/EditWish";
import EditCart from "./pages/admin/EditCart";
import EditOrder from "./pages/admin/EditOrder";
import AdminAddBook from "./pages/admin/AdminAddBook";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import EditProfile from "./pages/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Public routes
      { path: "login", element: <LoginPage />, },
      { path: "register", element: <RegisterPage />, },
      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "", element: <Home /> },
          { path: "shop", element: <Shop /> },
          { path: "book-info/:id", element: <BookInfo /> },
          { path: "books", element: <Books /> },
          { path: "open_search", element: <OpenSearch /> },
          { path: "bookDetail/:bookKey", element: <BookDetail /> },
          { path: "about", element: <About /> },
          { path: "contact", element: <Contact /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "cart", element: <Cart /> },
          { path: "profile", element: <Profile /> },
          { path: "edit-profile", element: <EditProfile /> },
        ]
      }
    ]
  },
  

  // ADMIN ROUTES
  {
    path: "/admin",
    element:  (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "books", element: <AdminBooks /> },
      { path: "edit-book/:bookId", element: <EditBook /> },
      { path: "edit-user/:userId", element: <EditUser /> },
      { path: "edit-wish/:wishId", element: <EditWish /> },
      { path: "edit-cart/:cartId", element: <EditCart /> },
      { path: "edit-order/:orderId", element: <EditOrder /> },
      { path: "add-books", element: <AdminAddBook /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>
};

export default App;