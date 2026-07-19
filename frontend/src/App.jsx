import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import History from "./pages/History";
import Profile from "./pages/Profile";
import OtpVerification from "./pages/OtpVerification";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route
          path="/"
          element={<Auth />}
        />

        {/* OTP Verification */}
        <Route
          path="/verify-otp"
          element={<OtpVerification />}
        />

        {/* Main Dashboard */}
        <Route
          path="/dashboard"
          element={<Home />}
        />

        {/* History */}
        <Route
          path="/history"
          element={<History />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;