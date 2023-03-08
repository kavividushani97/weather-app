import { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_config";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (loginEmail.trim() === "") {
      alert("Please enter your email");
      return;
    }

    if (loginPassword.trim() === "") {
      alert("Please enter your password");
      return;
    }

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="login-container">
      <div className="app-name">
        <h1>Weatherwhiz</h1>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <h3>User Login</h3>
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <button type="submit">LOGIN</button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
