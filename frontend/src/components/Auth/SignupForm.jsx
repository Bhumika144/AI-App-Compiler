import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Auth.css";

function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!name.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return false;
    }

    if (!email) {
      setError("Please enter your email address.");
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      setError("Please create a password.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/signup", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      console.log("Signup response:", response.data);

      // Save email temporarily for OTP verification
      sessionStorage.setItem("signupEmail", email.trim());
      sessionStorage.setItem("signupName", name.trim());

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);

      // Redirect to OTP Verification page
      navigate("/verify-otp");
    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        setError(error.response.data.message || "Signup failed. Please try again.");
      } else if (error.request) {
        setError("Unable to connect to server. Please check your internet connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      <p className="auth-subtitle">
        Join AI App Compiler and start building with AI.
      </p>

      <div className="input-group">
        <label htmlFor="signup-name">Full Name</label>
        <input
          id="signup-name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className={error && !name ? "input-error" : ""}
          autoFocus
        />
      </div>

      <div className="input-group">
        <label htmlFor="signup-email">Email Address</label>
        <input
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className={error && !email ? "input-error" : ""}
        />
      </div>

      <div className="input-group">
        <label htmlFor="signup-password">Password</label>
        <div className="password-box">
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className={error && !password ? "input-error" : ""}
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
      </div>

      <div className="input-group">
        <label htmlFor="signup-confirm">Confirm Password</label>
        <input
          id="signup-confirm"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className={error && confirmPassword && password !== confirmPassword ? "input-error" : ""}
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button
        className="primary-btn"
        onClick={handleSignup}
        disabled={loading}
      >
        <span className="btn-content">
          {loading ? (
            <>
              <span className="spinner"></span>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </span>
      </button>

      <p className="bottom-text">
        Secure authentication powered by OTP verification.
      </p>
    </div>
  );
}

export default SignupForm;