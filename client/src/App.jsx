import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, } from "react-router-dom";
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
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
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
        "http://localhost:5000/api/auth/login",
        formData
      );

      setMessage(response.data.message);

      // Save logged-in user
      localStorage.setItem(
        "famoraUser",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to log you in."
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
          <p className="eyebrow">WELCOME BACK</p>

          <h1>Log in to Famora</h1>

          <p>
            Continue managing your household in one place.
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
              placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Create an account</Link>
        </p>
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

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("famoraUser"));
  
  const [householdName, setHouseholdName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [household, setHousehold] = React.useState(null);
  const [householdLoading, setHouseholdLoading] = React.useState(true);
  
  const [members, setMembers] = React.useState([]);
  const [membersLoading, setMembersLoading] = React.useState(true);

  const [totalIncome, setTotalIncome] = React.useState(0);
  const [totalExpenses, setTotalExpenses] = React.useState(0);
  const householdBalance = totalIncome - totalExpenses;

  const fetchHousehold = async () => {
    if (!user?.id) {
      setHouseholdLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/households/${user.id}`
      );

      setHousehold(response.data.household);
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error("Get household error:", error);
      }
    } finally {
      setHouseholdLoading(false);
    }
  };
   
const fetchIncome = async (householdId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/income/${householdId}`
    );

    const incomeRecords = response.data.income || [];

    const total = incomeRecords.reduce(
      (sum, record) => sum + record.amount,
      0
    );

    setTotalIncome(total);
  } catch (error) {
    console.error("Get dashboard income error:", error);
    setTotalIncome(0);
  }
};

const fetchExpenses = async (householdId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/expenses/${householdId}`
    );

    const expenseRecords = response.data.expenses || [];

    const total = expenseRecords.reduce(
      (sum, record) => sum + record.amount,
      0
    );

    setTotalExpenses(total);
  } catch (error) {
    console.error("Get dashboard expenses error:", error);
    setTotalExpenses(0);
  }
};

  React.useEffect(() => {
  const fetchMembers = async () => {
    if (!household?._id) {
      setMembersLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/households/${household._id}/members`
      );

      setMembers(response.data.members);
    } catch (error) {
      console.error("Get members error:", error);
    } finally {
      setMembersLoading(false);
    }
  };

  fetchMembers();

  if (household?._id) {
    fetchIncome(household._id);
  }

  if(household?._id){
    fetchExpenses(household._id);
  }
}, [household]);


  React.useEffect(() => {
    fetchHousehold();
  }, []);
  
    async function handleCreateHousehold(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!householdName.trim()) {
      setError("Please enter a household name.");
      return;
    }

    if (!user?.id) {
      setError("User information not found. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/households",
        {
          name: householdName.trim(),
          owner: user.id,
        }
      );

      setMessage(response.data.message);
      setHouseholdName("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to create household."
      );
    } finally {
      setLoading(false);
    }
  }

 return (
  <div className="dashboard-page">

    {/* NAVBAR */}
    <nav className="navbar dashboard-navbar">

      <Link to="/dashboard" className="logo">
        Famora
      </Link>

      <div className="nav-links">
        <Link to="/income">Income</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/investments">Investments</Link>
        <Link to="/goals">Goals</Link>
      </div>

      <div className="dashboard-household">
        {household?.name || "HOUSEHOLD"}
      </div>

    </nav>


    {/* WELCOME SECTION */}
    <section className="dashboard-welcome">

      <p className="eyebrow">
        YOUR HOUSEHOLD
      </p>

      <h1>
        Welcome, {user?.name || "User"}.
      </h1>

      <p>
        Everything your household earns, spends, grows and saves for —
        in one calm place.
      </p>

    </section>


    {/* HOUSEHOLD SETUP */}
    {!household && !householdLoading && (
      <section className="dashboard-setup">

        <p className="eyebrow">
          GET STARTED
        </p>

        <h2>
          Create your household
        </h2>

        <p>
          Set up your household to start managing your finances together.
        </p>

        <form
          onSubmit={handleCreateHousehold}
          className="auth-form"
        >

          <label>
            Household name

            <input
              type="text"
              value={householdName}
              onChange={(event) =>
                setHouseholdName(event.target.value)
              }
              placeholder="e.g. Shukla Family"
              required
            />
          </label>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          {message && (
            <p className="form-success">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="primary-button auth-submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Household"}
          </button>

        </form>

      </section>
    )}


    {/* SUMMARY */}
    {household && (
      <section className="dashboard-summary">

        <div className="dashboard-summary-item">
          <span>HOUSEHOLD BALANCE</span>
          <strong>₹{householdBalance.toLocaleString("en-IN")}</strong>
        </div>

        <div className="dashboard-summary-item">
          <span>SAVED THIS MONTH</span>
          <strong>₹ —</strong>
        </div>

        <div className="dashboard-summary-item">
          <span>INVESTED TO DATE</span>
          <strong>₹ —</strong>
        </div>

        <div className="dashboard-summary-item">
          <span>HOUSEHOLD MEMBERS</span>
          <strong>{members.length}</strong>
        </div>

      </section>
    )}


    {/* FOUR MAIN FEATURES */}
    {household && (
      <section className="dashboard-features">

        {/* INCOME */}
        <Link
          to="/income"
          className="dashboard-feature-card"
        >

          <div className="dashboard-feature-top">
            <span className="dashboard-feature-number">
              FEATURE 01
            </span>
          </div>

          <h2>Income</h2>

          <strong className="dashboard-feature-value">
            ₹{totalIncome.toLocaleString("en-IN")}
          </strong>

          <p className="dashboard-feature-description">
            Money coming into your household.
          </p>

          <div className="dashboard-feature-line">
            <span>Salary</span>
            <span>View income</span>
          </div>

          <div className="dashboard-feature-line">
            <span>Freelance</span>
            <span>Manage</span>
          </div>

        </Link>


        {/* EXPENSES */}
        <Link
          to="/expenses"
          className="dashboard-feature-card"
        >

          <div className="dashboard-feature-top">
            <span className="dashboard-feature-number">
              FEATURE 02
            </span>
          </div>

          <h2>Expenses</h2>

          <strong className="dashboard-feature-value">
            ₹{totalExpenses.toLocaleString("en-IN")}
          </strong>

          <p className="dashboard-feature-description">
            Spending across your household.
          </p>

          <div className="dashboard-feature-line">
            <span>Groceries</span>
            <span>View expenses</span>
          </div>

          <div className="dashboard-feature-line">
            <span>Food</span>
            <span>Manage</span>
          </div>

        </Link>


        {/* INVESTMENTS */}
        <Link
          to="/investments"
          className="dashboard-feature-card"
        >

          <div className="dashboard-feature-top">
            <span className="dashboard-feature-number">
              FEATURE 03
            </span>
          </div>

          <h2>Investments</h2>

          <strong className="dashboard-feature-value">
            ₹ —
          </strong>

          <p className="dashboard-feature-description">
            Track your household investment portfolio.
          </p>

          <div className="dashboard-feature-line">
            <span>Portfolio</span>
            <span>Coming next</span>
          </div>

          <div className="dashboard-feature-line">
            <span>Allocation</span>
            <span>Manage</span>
          </div>

        </Link>


        {/* GOALS */}
        <Link
          to="/goals"
          className="dashboard-feature-card"
        >

          <div className="dashboard-feature-top">
            <span className="dashboard-feature-number">
              FEATURE 04
            </span>
          </div>

          <h2>Goals</h2>

          <strong className="dashboard-feature-value">
            — active
          </strong>

          <p className="dashboard-feature-description">
            Savings goals for the things that matter.
          </p>

          <div className="dashboard-feature-line">
            <span>Emergency fund</span>
            <span>Coming next</span>
          </div>

          <div className="dashboard-feature-line">
            <span>Future goals</span>
            <span>Manage</span>
          </div>

        </Link>

      </section>
    )}


    {/* BOTTOM MESSAGE */}
    <section className="dashboard-message">

      <div className="dashboard-message-mark">
        +
      </div>

      <h2>
        Small, steady steps grow a
        <br />
        household.
      </h2>

      <p>
        Famora keeps your household information together —
        so your family can focus on living, not managing scattered records.
      </p>

    </section>


    {/* FOOTER */}
    <footer>

      <span>Famora</span>

      <span>
        Income · Expenses · Investments · Goals
      </span>

    </footer>

  </div>
);
}


function Expenses() {
  const user = JSON.parse(localStorage.getItem("famoraUser"));

  const [expenses, setExpenses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);

  const [formData, setFormData] = React.useState({
     amount: "",
     category: "Groceries",
     date: "",
     description: "",
     paymentMethod: "UPI",
     isRecurring: false,
   });


  const handleExpenseChange = (event) => {
  const { name, value, type, checked } = event.target;

   setFormData({
     ...formData,
     [name]: type === "checkbox" ? checked : value,
   });
  }; 

  const handleExpenseSubmit = async (event) => {
  event.preventDefault();

  setError("");

  try {
    // Get the household belonging to the logged-in user
    const householdResponse = await axios.get(
      `http://localhost:5000/api/households/${user.id}`
    );

    const householdId = householdResponse.data.household?._id;

    if (!householdId) {
      setError("Household not found.");
      return;
    }

    // Send the expense to the backend
    await axios.post(
      "http://localhost:5000/api/expenses",
      {
        household: householdId,
        member: user.id,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
        description: formData.description,
        paymentMethod: formData.paymentMethod,
        isRecurring: formData.isRecurring,
      }
    );

    // Clear the form
    setFormData({
      amount: "",
      category: "Groceries",
      date: "",
      description: "",
      paymentMethod: "UPI",
      isRecurring: false,
    });

    // Close the form
    setShowAddForm(false);

    // Fetch the updated expense list
    await fetchExpenses();
  } catch (error) {
    console.error("Create expense error:", error);

    setError(
      error.response?.data?.message ||
        "Unable to add expense."
    );
  }
};

const handleDeleteExpense = async (expenseId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setError("");

    await axios.delete(
      `http://localhost:5000/api/expenses/${expenseId}`
    );

    await fetchExpenses();
  } catch (error) {
    console.error("Delete expense error:", error);

    setError(
      error.response?.data?.message ||
        "Unable to delete expense."
    );
  }
};

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const householdResponse = await axios.get(
        `http://localhost:5000/api/households/${user.id}`
      );

      const householdId = householdResponse.data.household?._id;

      if (!householdId) {
        setExpenses([]);
        return;
      }

      const expenseResponse = await axios.get(
        `http://localhost:5000/api/expenses/${householdId}`
      );

      setExpenses(expenseResponse.data.expenses || []);
    } catch (error) {
      console.error("Get expenses error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load expenses."
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user?.id) {
      fetchExpenses();
    } else {
      setLoading(false);
      setError("User information not found. Please log in again.");
    }
  }, []);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const recurringExpenses = expenses
    .filter((expense) => expense.isRecurring)
    .reduce((total, expense) => total + expense.amount, 0);

  const groceryExpenses = expenses
    .filter((expense) => expense.category === "Groceries")
    .reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="expenses-page">
      <Link to="/dashboard" className="logo">
        Famora
      </Link>

      <header className="expenses-header">
        <p className="eyebrow">HOUSEHOLD FINANCES</p>

        <h1>Expenses</h1>

        <p>
          Keep track of where your household money is going.
        </p>
      </header>

      {loading ? (
        <div className="expenses-loading">
          Loading your expenses...
        </div>
      ) : error ? (
        <div className="expenses-empty">
          <p className="form-error">{error}</p>
        </div>
      ) : (
        <>
          <section className="expenses-summary">
            <div className="expense-summary-card">
              <span>Total expenses</span>
              <strong>₹{totalExpenses.toLocaleString("en-IN")}</strong>
            </div>

            <div className="expense-summary-card">
              <span>Groceries</span>
              <strong>₹{groceryExpenses.toLocaleString("en-IN")}</strong>
            </div>

            <div className="expense-summary-card">
              <span>Recurring</span>
              <strong>
                ₹{recurringExpenses.toLocaleString("en-IN")}
              </strong>
            </div>
          </section>

          <section className="expenses-list-section">
            <div className="expenses-list-heading">
              <h2>Recent expenses</h2>

              <button
                 type = "button"
                 className = "primary-button"
                 onClick = {() => setShowAddForm(!showAddForm)}
                 >
                  {showAddForm ? "Close" : "+ Add Expense"}
                 </button>
            </div>
            {showAddForm && (
               <form
                 className="expense-form"
                 onSubmit={handleExpenseSubmit}
              >
               <div className="expense-form-grid">

                <label>
                  Amount
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleExpenseChange}
                    placeholder="e.g. 2400"
                    min="1"
                    required
                  />
                </label>

                <label>
                  Category
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleExpenseChange}
                  >
                    <option value="Food">Food</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Transport">Transport</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="EMI">EMI</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label>
                  Date
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleExpenseChange}
                    required
                  />
                </label>

                <label>
                  Payment method
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleExpenseChange}
                  >
                     <option value="Cash">Cash</option>
                     <option value="UPI">UPI</option>
                     <option value="Debit Card">Debit Card</option>
                     <option value="Credit Card">Credit Card</option>
                     <option value="Bank Transfer">Bank Transfer</option>
                     <option value="Other">Other</option>
                   </select>
                 </label>

                 <label className="expense-form-full">
                    Description
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleExpenseChange}
                      placeholder="e.g. Monthly groceries"
                    />
                 </label>

                 <label className="expense-checkbox">
                   <input
                     type="checkbox"
                     name="isRecurring"
                     checked={formData.isRecurring}
                     onChange={handleExpenseChange}
                   />

                   Recurring expense
                 </label>

              </div>

              <div className="expense-form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                 Save Expense
               </button>
             </div>
           </form>
          )}
            {expenses.length === 0 ? (
              <div className="expenses-empty">
                No expenses have been added yet.
              </div>
            ) : (
              <div className="expenses-list">
                {expenses.map((expense) => (
                  <div
                    key={expense._id}
                    className="expense-item"
                  >
                    <div className="expense-main">
                      <h3>{expense.category}</h3>

                      <p>
                        {expense.description || "No description"}
                      </p>
                    </div>

                    <div className="expense-detail">
                      <strong>
                        {new Date(expense.date).toLocaleDateString(
                          "en-IN"
                        )}
                      </strong>

                      <span>Date</span>
                    </div>

                    <div className="expense-detail">
                      <strong>{expense.paymentMethod}</strong>

                      <span>Payment</span>
                    </div>

                    <div className="expense-detail">
                      <strong>
                        {expense.member?.name || "Unknown"}
                      </strong>

                      <span>Added by</span>
                    </div>

                    <div className="expense-amount">
                      ₹{expense.amount.toLocaleString("en-IN")}
                    </div>

                     <button
                        type = "button"
                        className = "expense-delete-button"
                        onClick = { () => handleDeleteExpense(expense._id)}
                     >
                       Delete
                     </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="expenses-footer">
            <Link
              to="/dashboard"
              className="secondary-button"
            >
              Back to Dashboard
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function Income() {
  const user = JSON.parse(localStorage.getItem("famoraUser"));

  const [income, setIncome] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingIncomeId, setEditingIncomeId] = React.useState(null);

  const [formData, setFormData] = React.useState({
    amount: "",
    category: "Salary",
    date: "",
    description: "",
    isRecurring: false,
  });

  const handleIncomeChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

};

const handleIncomeSubmit = async (event) => {
  event.preventDefault();

  setError("");

  try {
    const householdResponse = await axios.get(
      `http://localhost:5000/api/households/${user.id}`
    );

    const householdId = householdResponse.data.household?._id;

    if (!householdId) {
      setError("Household not found.");
      return;
    }

   if (editingIncomeId) {
      await axios.put(
        `http://localhost:5000/api/income/${editingIncomeId}`,
      {
         amount: Number(formData.amount),
         category: formData.category,
         date: formData.date,
         description: formData.description,
         isRecurring: formData.isRecurring,
      }
    );
  } else {
    await axios.post(
       "http://localhost:5000/api/income",
      {
        household: householdId,
        member: user.id,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
        description: formData.description,
        isRecurring: formData.isRecurring,
      }
    );
   }
    setEditingIncomeId(null);
    setFormData({
      amount: "",
      category: "Salary",
      date: "",
      description: "",
      isRecurring: false,
    });

    setShowAddForm(false);

    await fetchIncome();
  } catch (error) {
    console.error("Create income error:", error);

    setError(
      error.response?.data?.message ||
        "Unable to add income."
    );
  }
};

const fetchIncome = async () => {
  try {
    setLoading(true);
    setError("");

    const householdResponse = await axios.get(
      `http://localhost:5000/api/households/${user.id}`
    );

    const householdId = householdResponse.data.household?._id;

    if (!householdId) {
      setIncome([]);
      return;
    }

    const incomeResponse = await axios.get(
      `http://localhost:5000/api/income/${householdId}`
    );

    setIncome(incomeResponse.data.income || []);
  } catch (error) {
    console.error("Get income error:", error);

    setError(
      error.response?.data?.message ||
        "Unable to load income."
    );
  } finally {
    setLoading(false);
  }
};

const handleDeleteIncome = async (incomeId) => {
  try {
    setError("");

    await axios.delete(
      `http://localhost:5000/api/income/${incomeId}`
    );

    await fetchIncome();
  } catch (error) {
    console.error("Delete income error:", error);

    setError(
      error.response?.data?.message ||
        "Unable to delete income."
    );
  }
};

const handleEditIncome = (record) => {
  setEditingIncomeId(record._id);

  setFormData({
    amount: record.amount,
    category: record.category,
    date: record.date
      ? new Date(record.date).toISOString().split("T")[0]
      : "",
    description: record.description || "",
    isRecurring: record.isRecurring,
  });

  setShowAddForm(true);
};

React.useEffect(() => {
  if (user?.id) {
    fetchIncome();
  } else {
    setLoading(false);
    setError("User information not found. Please log in again.");
  }
}, []);

const totalIncome = income.reduce(
  (total, record) => total + record.amount,
  0
);

const recurringIncome = income
  .filter((record) => record.isRecurring)
  .reduce((total, record) => total + record.amount, 0);

const salaryIncome = income
  .filter((record) => record.category === "Salary")
  .reduce((total, record) => total + record.amount, 0);

return (
  <div className="income-page">
    <Link to="/dashboard" className="logo">
      Famora
    </Link>

    <header className="income-header">
      <p className="eyebrow">HOUSEHOLD FINANCES</p>

      <h1>Income</h1>

      <p>
        Keep track of the money coming into your household.
      </p>
    </header>

    <section className="income-summary">
      <div className="income-summary-card">
        <span>Total income</span>
        <strong>
          ₹{totalIncome.toLocaleString("en-IN")}
        </strong>
      </div>

      <div className="income-summary-card">
        <span>Salary</span>
        <strong>
          ₹{salaryIncome.toLocaleString("en-IN")}
        </strong>
      </div>

      <div className="income-summary-card">
        <span>Recurring</span>
        <strong>
          ₹{recurringIncome.toLocaleString("en-IN")}
        </strong>
      </div>
    </section>

    <section className="income-list-section">
      <div className="income-list-heading">
        <h2>Income history</h2>

        <button
          type="button"
          className="primary-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Close" : editingIncomeId ? "Edit Income" : "+Add Income"}
        </button>
      </div>

      {showAddForm && (
        <form
          className="income-form"
          onSubmit={handleIncomeSubmit}
        >
          <div className="income-form-grid">

            <label>
              Amount
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleIncomeChange}
                placeholder="e.g. 50000"
                min="1"
                required
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleIncomeChange}
              >
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Business">Business</option>
                <option value="Rental">Rental</option>
                <option value="Bonus">Bonus</option>
                <option value="Interest">Interest</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Date
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleIncomeChange}
                required
              />
            </label>

            <label className="income-form-full">
              Description
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleIncomeChange}
                placeholder="e.g. Monthly salary"
              />
            </label>

            <label className="income-checkbox">
              <input
                type="checkbox"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleIncomeChange}
              />

              Recurring income
            </label>

          </div>

          <div className="income-form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Save Income
            </button>
          </div>
        </form>
      )}
            {loading ? (
               <div className="income-empty">
                  Loading your income...
              </div>
            ) : error ? (
              <div className="income-empty">
                <p className="form-error">{error}</p>
              </div>
            ) : income.length === 0 ? (
              <div className="income-empty">
                No income has been added yet.
              </div>
            ) : (
              <div className="income-list">
                {income.map((record) => (
                  <div
                    key={record._id}
                    className="income-item"
                  >
                    <div className="income-main">
                       <h3>{record.category}</h3>

                      <p>
                         {record.description || "No description"}
                      </p>
                    </div>

                    <div className="income-detail">
                      <strong>
                       {new Date(record.date).toLocaleDateString(
                          "en-IN"
                       )}
                     </strong>
                     <span>Date</span>
                    </div>

                    <div className="income-detail">
                      <strong>
                        {record.member?.name || "Unknown"}
                       </strong>
                       <span>Added by</span>
                    </div>

                    <div className="income-detail">
                      <strong>
                       {record.isRecurring ? "Recurring" : "One-time"}
                     </strong>
                     <span>Type</span>
                   </div>

                   <div className="income-amount">
                      ₹{record.amount.toLocaleString("en-IN")}
                    </div>
                    <button
                       type = "button"
                       className = "secondary-button"
                       onClick = { () => handleEditIncome(record)}
                       >
                        Edit
                       </button>
                    <button
                       type = "button"
                       className = "secondary-button"
                       onClick = {() => handleDeleteIncome(record._id)}
                       >
                        Delete
                       </button>
                 </div>
               ))}
             </div>
           )}
    </section>
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/income" element={<Income />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;