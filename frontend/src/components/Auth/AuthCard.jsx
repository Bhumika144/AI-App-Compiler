import { useState } from "react";
import "../../styles/Auth.css";

import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function AuthCard() {

  const [activeTab, setActiveTab] = useState("signup");

  return (
    <div className="auth-card-container">

      <div className="auth-card">

        <div className="tab-header">

          <div
            className={`tab-slider ${
              activeTab === "login"
                ? "move-right"
                : ""
            }`}
          ></div>

          <button
            className={
              activeTab === "signup"
                ? "active-tab"
                : ""
            }
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>

          <button
            className={
              activeTab === "login"
                ? "active-tab"
                : ""
            }
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>

        </div>

        <div className="form-wrapper">

          {activeTab === "signup"
            ? <SignupForm />
            : <LoginForm />}

        </div>

      </div>

    </div>
  );
}

export default AuthCard;