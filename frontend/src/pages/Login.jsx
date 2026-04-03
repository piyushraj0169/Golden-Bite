import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postJSON } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { FaEnvelope, FaLock, FaKey, FaMobileAlt } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [mode, setMode] = useState("password"); // "password" | "otp-send" | "otp-verify"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await postJSON("/auth/login", { email, password, rememberMe });
      login(data);
      if (data.user?.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendLoginOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await postJSON("/auth/send-login-otp", { email });
      setSuccess(data.message);
      setMode("otp-verify");
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLoginOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await postJSON("/auth/verify-login-otp", { email, otp, rememberMe });
      login(data);
      if (data.user?.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
    setOtp("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">
          {mode === "password" && "Log in to access your GoldenBite dashboard"}
          {mode === "otp-send" && "Enter your email to receive a login OTP"}
          {mode === "otp-verify" && "Enter the OTP sent to your email"}
        </p>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        {/* PASSWORD LOGIN */}
        {mode === "password" && (
          <form onSubmit={handlePasswordLogin}>
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="auth-icon" />
            </div>

            <div className="d-flex align-items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                className="form-check-input mt-0 me-2 custom-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-light" style={{ fontSize: "0.9rem", cursor: "pointer" }}>
                Remember me for 15 days
              </label>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="auth-alt-actions">
              <button type="button" className="auth-alt-link" onClick={() => switchMode("otp-send")}>
                <FaMobileAlt className="me-1" /> Login with OTP
              </button>
              <Link to="/forgot-password" className="auth-alt-link">
                Forgot Password?
              </Link>
            </div>
          </form>
        )}

        {/* OTP: SEND */}
        {mode === "otp-send" && (
          <form onSubmit={handleSendLoginOtp}>
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
              {loading ? "Sending OTP..." : "Send Login OTP"}
            </button>

            <div className="auth-alt-actions">
              <button type="button" className="auth-alt-link" onClick={() => switchMode("password")}>
                <FaLock className="me-1" /> Login with Password
              </button>
            </div>
          </form>
        )}

        {/* OTP: VERIFY */}
        {mode === "otp-verify" && (
          <form onSubmit={handleVerifyLoginOtp}>
            <p className="text-center" style={{ color: "#bbbbbb", marginBottom: "1rem" }}>
              Enter the 6-digit code sent to <strong>{email}</strong>
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

            <div className="d-flex align-items-center mb-4 justify-content-center">
              <input
                type="checkbox"
                id="rememberMeOtp"
                className="form-check-input mt-0 me-2 custom-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMeOtp" className="text-light" style={{ fontSize: "0.9rem", cursor: "pointer" }}>
                Remember me for 15 days
              </label>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              type="button"
              className="auth-alt-link d-block mx-auto mt-3"
              onClick={() => switchMode("otp-send")}
            >
              Resend OTP
            </button>
          </form>
        )}

        <p className="auth-link-text">
          Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
