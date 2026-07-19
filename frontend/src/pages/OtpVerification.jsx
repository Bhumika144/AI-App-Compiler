import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Auth.css";

function OtpVerification() {

    const navigate = useNavigate();

    const email = sessionStorage.getItem("signupEmail");

    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (timer <= 0) return;

        const interval = setInterval(() => {

            setTimer((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    const verifyOTP = async () => {

        if (!otp) {
            alert("Please enter OTP");
            return;
        }

        try {

            setLoading(true);

            const response = await API.post("/verify-otp", {
                email,
                otp
            });

            alert(response.data.message);

            sessionStorage.removeItem("signupEmail");

            navigate("/dashboard");

        }

        catch (error) {

            alert(error.response?.data?.message || "Verification Failed");

        }

        finally {

            setLoading(false);

        }

    };

    const resendOTP = async () => {

        try {

            const response = await API.post("/resend-otp", {
                email
            });

            alert(response.data.message);

            setTimer(60);

        }

        catch (error) {

            alert(error.response?.data?.message || "Unable to resend OTP");

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card-container">

                <div className="auth-card otp-card">

                    <h2>Verify Email</h2>

                    <p className="auth-subtitle">

                        Enter the 6-digit OTP sent to

                        <br />

                        <strong>{email}</strong>

                    </p>

                    <div className="input-group">

                        <label>OTP</label>

                        <input
                            type="text"
                            maxLength="6"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                    </div>

                    <button
                        className="primary-btn"
                        onClick={verifyOTP}
                        disabled={loading}
                    >

                        {loading ? "Verifying..." : "Verify OTP"}

                    </button>

                    <div className="otp-footer">

                        {

                            timer > 0 ?

                                <p>

                                    Resend OTP in

                                    <span> {timer}s</span>

                                </p>

                                :

                                <button
                                    className="resend-btn"
                                    onClick={resendOTP}
                                >

                                    Resend OTP

                                </button>

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default OtpVerification;