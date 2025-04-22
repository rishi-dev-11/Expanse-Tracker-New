import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/expense");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
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
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill mt-3"
            >
              Login
            </button>
          </form>
          <p
            className="text-center mt-3 mb-0 text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            Don't have an account? <a href="#">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
