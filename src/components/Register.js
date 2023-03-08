import { useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_config";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    if (registerEmail.trim() === "") {
      alert("Please enter your email");
      return;
    }

    if (registerPassword.trim() === "") {
      alert("Please enter your password");
      return;
    }

    if (registerConfirmPassword.trim() === "") {
      alert("Please confirm your password");
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="register-container">
      <div className="app-name">
        <h1>Weatherwhiz</h1>
      </div>
      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <h3>User Registration</h3>
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setRegisterConfirmPassword(e.target.value);
            }}
          />
          <button type="submit">REGISTER</button>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
