import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  Wallet,
  Receipt,
  ShoppingCart,
  Target,
  Users,
  ShieldCheck,
} from "lucide-react";
import "./App.css";

function Home() {
  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="logo">
          Famora
        </Link>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Log in
          </Link>

          <Link to="/register" className="primary-button">
            Get started
          </Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">HOUSEHOLD MANAGEMENT, SIMPLIFIED</p>

            <h1>
              Everything your household
              <span> needs, in one place.</span>
            </h1>

            <p className="hero-text">
              Famora brings your family's money, bills, groceries,
              investments and goals together in one shared space.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="primary-button large">
                Create your household
                <ArrowRight size={18} />
              </Link>

              <a href="#features" className="secondary-button">
                Explore Famora
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-header">
              <div>
                <p className="panel-label">HOUSEHOLD OVERVIEW</p>
                <h3>Shukla Family</h3>
              </div>

              <Users size={22} />
            </div>

            <div className="overview-row">
              <div>
                <span>Monthly spending</span>
                <strong>₹42,850</strong>
              </div>

              <div>
                <span>Active members</span>
                <strong>4</strong>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-heading">
                <span>Monthly budget</span>
                <span>68%</span>
              </div>

              <div className="progress-bar">
                <div className="progress-value"></div>
              </div>
            </div>

            <div className="panel-note">
              <ShieldCheck size={17} />
              <span>Shared with your household</span>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="section-heading">
            <p className="eyebrow">ONE HOUSEHOLD. ONE VIEW.</p>

            <h2>
              Everything important,
              <br />
              connected.
            </h2>

            <p>
              Stop keeping household information scattered across
              notebooks, messages and different apps.
            </p>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon={<Wallet size={22} />}
              title="Money"
              text="Track household income, expenses and spending in one place."
            />

            <FeatureCard
              icon={<Receipt size={22} />}
              title="Bills"
              text="Keep recurring bills and payment information organized."
            />

            <FeatureCard
              icon={<ShoppingCart size={22} />}
              title="Groceries"
              text="Create and manage shared shopping lists for your household."
            />

            <FeatureCard
              icon={<Target size={22} />}
              title="Goals"
              text="Plan savings goals and keep everyone aligned."
            />
          </div>
        </section>

        <section id="about" className="about-section">
          <div>
            <p className="eyebrow">WHY FAMORA?</p>

            <h2>
              Built around the
              <br />
              household, not just one person.
            </h2>
          </div>

          <p>
            Most finance and productivity apps focus on individuals.
            Famora is designed around the people who share a home,
            helping everyone see and manage the things that matter
            together.
          </p>
        </section>

        <section className="cta-section">
          <div>
            <p className="eyebrow">READY TO GET ORGANIZED?</p>

            <h2>Bring your household together.</h2>
          </div>

          <Link to="/register" className="primary-button large">
            Get started
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      <footer>
        <span>Famora</span>
        <span>Household management, simplified.</span>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function Login() {
  return (
    <div className="simple-page">
      <Link to="/" className="logo">
        Famora
      </Link>

      <div className="simple-content">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Log in to Famora</h1>
        <p>
          Your login form will be connected to the real authentication
          system next.
        </p>

        <Link to="/" className="secondary-button">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function Register() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      setMessage(response.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="logo">
        Famora
      </Link>

      <div className="auth-container">
        <div className="auth-header">
          <p className="eyebrow">GET STARTED</p>

          <h1>Create your account</h1>

          <p>
            Start bringing your household together in one place.
          </p>
        </div>

        <button className="google-button" type="button">
          <span className="google-mark">G</span>
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or continue with email</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          {message && <p className="form-success">{message}</p>}

          <button
            type="submit"
            className="primary-button auth-submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;