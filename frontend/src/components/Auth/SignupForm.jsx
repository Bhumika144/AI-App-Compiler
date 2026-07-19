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

  const handleSignup = async () => {

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post("/signup", {
        name,
        email,
        password,
      });

      console.log(response.data);

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to OTP Verification page
     // Save email temporarily
sessionStorage.setItem("signupEmail", email);

// Go to OTP page
navigate("/verify-otp");

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to connect to server.");
      }

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="auth-form">

      <h2>Create Account</h2>

      <p className="auth-subtitle">
        Join AI App Compiler and start building with AI.
      </p>

      <div className="input-group">

        <label>Full Name</label>

        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

      </div>

      <div className="input-group">

        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

      </div>

      <div className="input-group">

        <label>Password</label>

        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>

        </div>

      </div>

      <div className="input-group">

        <label>Confirm Password</label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

      </div>

      <button
        type="button"
        className="primary-btn"
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="bottom-text">
        Secure authentication powered by OTP verification.
      </p>

    </div>
  );
}

export default SignupForm;