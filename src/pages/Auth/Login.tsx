import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import lumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authenticateUser, setSessionUser } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = authenticateUser(email, password);
    if (!user) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please sign up first.",
        variant: "destructive",
      });
      return;
    }

    setSessionUser(user);
    if (user.role === "teacher") {
      navigate("/teacher-dashboard");
      return;
    }

    navigate("/dashboard");
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
          background: linear-gradient(135deg, #10B981, #F9FAFB);
          font-family: Inter, system-ui, sans-serif;
          position: relative;
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

        .back-button {
          position: absolute;
          top: 24px;
          left: 24px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          background: rgba(255, 255, 255, 0.85);
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          border: none;
        }

        .back-button:hover {
          background: white;
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

      <div className="login-page">
        {/* 🔙 BACK BUTTON */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="login-card">
          <div className="login-header">
            <Link to="/">
              <img
                src={lumioLogo}
                alt="Lumio"
                className="h-24 w-auto mx-auto"
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
            New here? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}
