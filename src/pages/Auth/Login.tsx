import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ⭐️ CHANGED #1 — Added Link
import lumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      navigate("/"); // redirect to home
    }
  };

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #10B981 , #F9FAFB );
          font-family: Inter, system-ui, sans-serif;
        }

        .login-card {
          background: white;
          width: 360px;
          padding: 42px 38px;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          animation: fadeIn 0.6s ease;
        }

        .login-header {
          text-align: center;
          margin-bottom: 24px;
          
        }

        .lumino-logo {
          width: 120px;
          margin: 0 auto 10px;
          display: block;
        }

        .login-header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          color: #111827;
        }

        .login-header p {
          margin-top: 4px;
          font-size: 14px;
          color: #6b7280;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .login-form input {
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }

        .login-form input:focus {
          outline: none;
          border-color: #10B981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .login-form button {
          margin-top: 6px;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #10B981;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }

        .login-form button:hover {
          background: #059669;
        }

        .login-footer {
          margin-top: 18px;
          text-align: center;
          font-size: 13px;
          color: #6b7280;
        }

        .login-footer a {
          color: #4F46E5;
          font-weight: 600;
          text-decoration: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* JSX */}
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            {/* ⭐️ CHANGED #2 — Wrapped logo in Link so it navigates home */}
            <Link to="/">
              <img
                src={lumioLogo}
                alt="Lumio"
                className="h-24 w-auto mx-auto y-1"
              />
            </Link>

            <h1>Lumio</h1>
            <p>Adaptive Learning Platform</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <div className="login-footer">
            New here? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </>
  );
}
