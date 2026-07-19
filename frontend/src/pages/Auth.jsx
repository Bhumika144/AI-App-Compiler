import "../styles/Auth.css";

import AuthLeftPanel from "../components/Auth/AuthLeftPanel";
import AuthCard from "../components/Auth/AuthCard";

function Auth() {
  return (
    <div className="auth-container">
      <AuthLeftPanel />
      <AuthCard />
    </div>
  );
}

export default Auth;