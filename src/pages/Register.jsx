import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJSON } from "../utils/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await postJSON("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
