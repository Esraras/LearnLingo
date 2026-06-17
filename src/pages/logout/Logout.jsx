import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../redux/auth/operations.js";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("You have been logged out.");
      })
      .catch(() => {
        toast.error("Logout failed. Redirecting to home.");
      })
      .finally(() => {
        setLoading(false);
        navigate("/");
      });
  }, [dispatch, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Logging out</h2>
        <p>{loading ? "Please wait while we log you out..." : "Redirecting to home..."}</p>
      </div>
    </div>
  );
};

export default Logout;
