import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { register as registerUser } from "../../redux/auth/operations.js";
import { toast } from "react-toastify";
import { registerSchema } from "../../schemas/authSchemas.js";

const Register = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    setError(null);
    setLoading(true);

    try {
      const data = await dispatch(
        registerUser({
          displayName: values.name,
          email: values.email,
          password: values.password,
        })
      ).unwrap();
      toast.success(`Welcome ${data.user.displayName || data.user.email}!`);
    } catch (authError) {
      toast.error("Registration failed");
      setError(authError.message || String(authError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <p>Create your account to get started.</p>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <input type="text" placeholder="John Doe" {...register("name")} />
            {errors.name && <span className="form-error">{errors.name.message}</span>}
          </label>

          <label>
            Email
            <input type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </label>

          <label>
            Password
            <input type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <span className="form-error">{errors.password.message}</span>}
          </label>

          <label>
            Confirm Password
            <input type="password" placeholder="••••••••" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <span className="form-error">{errors.confirmPassword.message}</span>
            )}
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="auth-submit-btn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
