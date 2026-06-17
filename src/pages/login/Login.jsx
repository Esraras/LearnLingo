import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login, googleLogin } from "../../redux/auth/operations.js";
import { toast } from "react-toastify";
import { loginSchema } from "../../schemas/authSchemas.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    setError(null);
    setLoading(true);

    try {
      const data = await dispatch(login(values)).unwrap();
      toast.success(`Welcome back, ${data.user.displayName || data.user.email}!`);
      navigate("/teachers");
    } catch (authError) {
      toast.error("Invalid credentials");
      setError(authError.message || String(authError));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await dispatch(googleLogin()).unwrap();
      toast.success(`Welcome back, ${data.user.displayName || data.user.email}!`);
      navigate("/");
    } catch (authError) {
      toast.error("Google login failed");
      setError(authError.message || String(authError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <p>Enter your email and password to continue.</p>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </label>

          <label>
            Password
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password.message}</span>}
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <div className="social-login">
          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <span className="google-icon">G</span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
