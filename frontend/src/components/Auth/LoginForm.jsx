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

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post("/login", {

        email,

        password

      });

      // Save JWT
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save User Details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      navigate("/dashboard");

    }

    catch (error) {

      console.error(error);

      if (error.response) {

        alert(error.response.data.message);

      }

      else {

        alert("Unable to connect to server.");

      }

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-form">

      <h2>Welcome Back</h2>

      <p className="auth-subtitle">
        Login to continue building AI-powered applications.
      </p>

      <div className="input-group">

        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

      </div>

      <div className="input-group">

        <label>Password</label>

        <div className="password-box">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? "🙈" : "👁"}
          </button>

        </div>

      </div>

      <div className="forgot-password">

        <button type="button">

          Forgot Password?

        </button>

      </div>

      <button
        className="primary-btn"
        onClick={handleLogin}
        disabled={loading}
      >

        {loading ? "Logging In..." : "Login"}

      </button>

      <p className="bottom-text">
        Secure login with JWT Authentication.
      </p>

    </div>

  );

}

export default LoginForm;