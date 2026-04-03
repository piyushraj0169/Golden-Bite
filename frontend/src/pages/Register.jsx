import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postJSON } from "../utils/api";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaKey } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      await postJSON("/auth/send-otp", { email, name });
      setOtpSent(true);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      return setError("Please enter the OTP sent to your email");
    }

    setLoading(true);
    try {
      const data = await postJSON("/auth/register", {
        name,
        email,
        phone,
        password,
        otp,
      });

      // Auto-login the user with the returned token and user data
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join GoldenBite and start ordering today</p>

        {error && <div className="auth-error">{error}</div>}

        {!otpSent ? (
          <form onSubmit={handleSendOTP}>
            <div className="auth-form-group">
              <input
                className="auth-input"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FaUser className="auth-icon" />
            </div>

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

            <div className="auth-form-group">
              <input
                className="auth-input"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <FaPhoneAlt className="auth-icon" />
            </div>

            <div className="auth-form-group">
              <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="auth-icon" />
            </div>

            <div className="auth-form-group">
              <input
                className="auth-input"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FaLock className="auth-icon" />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndRegister}>
            <p className="text-center" style={{ color: "#bbbbbb", marginBottom: "1rem" }}>
              Enter the 6-digit verification code sent to <strong>{email}</strong>
            </p>
            <div className="auth-form-group">
              <input
                className="auth-input"
                type="text"
                placeholder="Enter OTP (e.g. 123456)"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                style={{ letterSpacing: "2px", textAlign: "center", paddingLeft: "1rem" }}
              />
              <FaKey className="auth-icon" style={{ left: "auto", right: "1rem" }} />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Register"}
            </button>
            <button
              type="button"
              className="btn btn-link mt-3 w-100"
              style={{ color: "#aaaaaa", textDecoration: "none" }}
              onClick={() => setOtpSent(false)}
            >
              Back to Edit Details
            </button>
          </form>
        )}

        <p className="auth-link-text">
          Already have an account? <Link to="/login" className="auth-link">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
