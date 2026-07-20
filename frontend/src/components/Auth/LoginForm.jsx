import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Auth.css";

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/login", {
        email,
        password,
      });

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Save User Details
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Dispatch storage event for other tabs
      window.dispatchEvent(new Event("storage"));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(error.response.data.message || "Invalid credentials.");
      } else if (error.request) {
        setError("Unable to connect to server. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="auth-form">
      <h2>Welcome Back</h2>
      <p className="auth-subtitle">
        Login to continue building AI-powered applications.
      </p>

      <div className="input-group">
        <label htmlFor="login-email">Email Address</label>
        <input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className={error ? "input-error" : ""}
          autoFocus
        />
      </div>

      <div className="input-group">
        <label htmlFor="login-password">Password</label>
        <div className="password-box">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className={error ? "input-error" : ""}
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "👁️‍🗨️" : "👁️"}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="forgot-password">
        <button type="button" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </button>
      </div>

      <button
        className="primary-btn"
        onClick={handleLogin}
        disabled={loading}
      >
        <span className="btn-content">
          {loading ? (
            <>
              <span className="spinner"></span>
              Logging In...
            </>
          ) : (
            "Login"
          )}
        </span>
      </button>

      <p className="bottom-text">
        Secure login with JWT Authentication.
      </p>
    </div>
  );
}

export default LoginForm;