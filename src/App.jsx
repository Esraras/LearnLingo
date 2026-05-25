import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Teachers from "./pages/teachers/Teachers";
import "./App.css";
import { refreshUser } from "./redux/auth/operations";
import { useDispatch } from "react-redux";
import { useEffect, memo, Suspense } from "react";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="teachers"
          element={
            <PrivateRoute>
              <Teachers />
            </PrivateRoute>
          }
        />
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

        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Suspense>
  );
}

export default memo(App);
