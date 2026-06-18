import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Logout from "./pages/logout/Logout";
import Teachers from "./pages/teachers/Teachers";
import Favorites from "./pages/favorites/Favorites";
import Bookings from "./pages/bookings/Bookings";
import PageTransition from "./components/ui/PageTransition";
import "./App.css";
import { refreshUser } from "./redux/auth/operations";
import { useDispatch } from "react-redux";
import { useEffect, Suspense } from "react";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="teachers" element={<Teachers />} />
          <Route
            path="favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path="bookings" element={<Bookings />} />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PageTransition>
    </Suspense>
  );
}

export default App;
