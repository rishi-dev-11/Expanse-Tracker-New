import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Create Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control rounded-pill px-3"
                id="name"
                placeholder="Siddaram"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control rounded-pill px-3"
                id="email"
                placeholder="name@example.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control rounded-pill px-3"
                id="password"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill mt-3"
            >
              Register
            </button>
          </form>
          <p
            className="text-center mt-3 mb-0 text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            Already have an account? <a href="#">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
