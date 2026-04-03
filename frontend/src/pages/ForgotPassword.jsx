import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postJSON } from "../utils/api";
import { FaEnvelope, FaKey, FaLock, FaCheckCircle } from "react-icons/fa";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password, 4: done
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const data = await postJSON("/auth/forgot-password", { email });
            setSuccess(data.message);
            setStep(2);
        } catch (err) {
            setError(err.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (!otp || otp.length !== 6) return setError("Please enter a valid 6-digit OTP");
        setStep(3);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) return setError("Passwords do not match");
        if (newPassword.length < 6) return setError("Password must be at least 6 characters");

        setLoading(true);
        try {
            const data = await postJSON("/auth/reset-password", { email, otp, newPassword });
            setSuccess(data.message);
            setStep(4);
        } catch (err) {
            setError(err.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">
                    {step === 4 ? "Password Reset!" : "Reset Password"}
                </h2>
                <p className="auth-subtitle">
                    {step === 1 && "Enter your email to receive a reset code"}
                    {step === 2 && "Enter the OTP sent to your email"}
                    {step === 3 && "Create your new password"}
                    {step === 4 && "Your password has been changed successfully"}
                </p>

                {error && <div className="auth-error">{error}</div>}
                {success && step !== 4 && <div className="auth-success">{success}</div>}

                {/* STEP 1: Email */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <div className="auth-form-group">
                            <input
                                className="auth-input"
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FaEnvelope className="auth-icon" />
                        </div>
                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "Sending OTP..." : "Send Reset Code"}
                        </button>
                    </form>
                )}

                {/* STEP 2: OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <p className="text-center" style={{ color: "#bbbbbb", marginBottom: "1rem" }}>
                            Check your inbox at <strong>{email}</strong>
                        </p>
                        <div className="auth-form-group">
                            <input
                                className="auth-input"
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                                style={{ letterSpacing: "2px", textAlign: "center", paddingLeft: "1rem" }}
                            />
                            <FaKey className="auth-icon" style={{ left: "auto", right: "1rem" }} />
                        </div>
                        <button type="submit" className="auth-btn">Continue</button>
                        <button
                            type="button"
                            className="auth-alt-link d-block mx-auto mt-3"
                            onClick={() => { setStep(1); setError(""); setSuccess(""); }}
                        >
                            Resend OTP
                        </button>
                    </form>
                )}

                {/* STEP 3: New Password */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <div className="auth-form-group">
                            <input
                                className="auth-input"
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <FaLock className="auth-icon" />
                        </div>
                        <div className="auth-form-group">
                            <input
                                className="auth-input"
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <FaLock className="auth-icon" />
                        </div>
                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}

                {/* STEP 4: Done */}
                {step === 4 && (
                    <div className="text-center">
                        <FaCheckCircle size={60} className="text-success mb-3" style={{ animation: "pulseGlow 2s ease-in-out infinite" }} />
                        <p className="text-light">{success}</p>
                        <button className="auth-btn mt-3" onClick={() => navigate("/login")}>
                            Go to Login
                        </button>
                    </div>
                )}

                <p className="auth-link-text">
                    Remember your password? <Link to="/login" className="auth-link">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
