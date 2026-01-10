import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postJSON } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await postJSON("/auth/login", {
        email,
        password,
      });

      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
