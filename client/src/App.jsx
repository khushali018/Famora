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

function FamoraNavbar() {
  const user = JSON.parse(localStorage.getItem("famoraUser"));

  const [household, setHousehold] = React.useState(null);

  React.useEffect(() => {
    const fetchHousehold = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/households/${user.id}`
        );

        setHousehold(response.data.household);
      } catch (error) {
        console.error("Get navbar household error:", error);
      }
    };

    fetchHousehold();
  }, []);

  return (
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
  const [monthlySavings, setMonthlySavings] = React.useState(0);
  const calculateMonthlySavings = (incomes, expenses) => {
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyIncome = incomes
    .filter((income) => {
      const date = new Date(income.date);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((total, income) => total + income.amount, 0);

  const monthlyExpenses = expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((total, expense) => total + expense.amount, 0);

  setMonthlySavings(monthlyIncome - monthlyExpenses);
};
  const [totalGoals, setTotalGoals] = React.useState(0);
  const [activeGoals, setActiveGoals] = React.useState(0);
  const [totalInvested, setTotalInvested] = React.useState(0);
  const [currentInvestmentValue, setCurrentInvestmentValue] = React.useState(0);
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

const fetchMonthlySavings = async (householdId) => {
  try {
    const incomeResponse = await axios.get(
      `http://localhost:5000/api/income/${householdId}`
    );

    const expenseResponse = await axios.get(
      `http://localhost:5000/api/expenses/${householdId}`
    );

    const incomes = incomeResponse.data.income || [];
    const expenses = expenseResponse.data.expenses || [];

    calculateMonthlySavings(incomes, expenses);
  } catch (error) {
    console.error("Calculate monthly savings error:", error);
    setMonthlySavings(0);
  }
};

const fetchGoals = async (householdId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/goals/${householdId}`
    );

    const goals = response.data.goals || [];

    setTotalGoals(goals.length);

    setActiveGoals(
      goals.filter((goal) => goal.status === "Active").length
    );
  } catch (error) {
    console.error("Get dashboard goals error:", error);
    setTotalGoals(0);
    setActiveGoals(0);
  }
};

const fetchInvestments = async (householdId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/investments/${householdId}`
    );

    const investments = response.data.investments || [];

    const investedTotal = investments.reduce(
      (sum, investment) => sum + investment.investedAmount,
      0
    );

    const currentValueTotal = investments.reduce(
      (sum, investment) => sum + investment.currentValue,
      0
    );

    setTotalInvested(investedTotal);
    setCurrentInvestmentValue(currentValueTotal);
  } catch (error) {
    console.error(
      "Get dashboard investments error:",
      error
    );

    setTotalInvested(0);
    setCurrentInvestmentValue(0);
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

  if(household?._id) {
    fetchMonthlySavings(household._id);
  }

  if(household?._id) {
    fetchGoals(household._id);
  }

  if(household?._id) {
    fetchInvestments(household._id);
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
  <FamoraNavbar />


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
          <strong>₹{monthlySavings.toLocaleString("en-IN")}</strong>
        </div>

        <div className="dashboard-summary-item">
          <span>INVESTED TO DATE</span>
          <strong>₹{totalInvested.toLocaleString("en-IN")}</strong>
        </div>

        <div className="dashboard-summary-item">
          <span>HOUSEHOLD MEMBERS</span>
          <strong>{members.length}</strong>
        </div>

      </section>
    )}
      {household && (
         <section className="dashboard-members">

         <div className="dashboard-members-heading">
           <div>
             <p className="eyebrow">HOUSEHOLD</p>
             <h2>Members</h2>
           </div>
         </div>

         {membersLoading ? (
           <p>Loading members...</p>
         ) : members.length === 0 ? (
           <p>No household members found.</p>
          ) : (
            <div className="dashboard-members-list">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="dashboard-member-item"
                >
                 <div>
                   <strong>{member.user?.name}</strong>
                   <span>{member.user?.email}</span>
                 </div>

                 <span className="dashboard-member-role">
                  {member.role}
                </span>
               </div>
             ))}
          </div>
        )}

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
            ₹{currentInvestmentValue.toLocaleString("en-IN")}
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
            {activeGoals} active
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
  const [editingExpenseId, setEditingExpenseId] = React.useState(null);

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
    if (editingExpenseId) {
      await axios.put(
        `http://localhost:5000/api/expenses/${editingExpenseId}`,
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
    } else {
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
   }

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
    setEditingExpenseId(null);

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
      
        <FamoraNavbar />

        

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
                    <div className="expense-actions">
                     <button
                       type="button"
                       className="secondary-button"
                       onClick={() => {
                        setEditingExpenseId(expense._id);

                        setFormData({
                         amount: expense.amount,
                         category: expense.category,
                         date: expense.date
                           ? expense.date.split("T")[0]
                           : "",
                         description: expense.description || "",
                         paymentMethod: expense.paymentMethod || "Other",
                         isRecurring: expense.isRecurring || false,
                       });

                       setShowAddForm(true);
                     }}
                    >
                      Edit
                   </button>

                  <button
                   type="button"
                   className="expense-delete-button"
                   onClick={() => handleDeleteExpense(expense._id)}
                  >
                    Delete
                  </button>
                </div>
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
    <FamoraNavbar />

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
           <div className="income-footer">
              <Link
                to="/dashboard"
                className="secondary-button"
              >
                Back to Dashboard
              </Link>
            </div>
    </section>
  </div>
);


}
  
function Investments() {
  const user = JSON.parse(localStorage.getItem("famoraUser"));

  const [investments, setInvestments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingInvestmentId, setEditingInvestmentId] =
    React.useState(null);

const [formData, setFormData] = React.useState({
    type: "Fixed Deposit",
    name: "",
    institution: "",
    investedAmount: "",
    currentValue: "",
    interestRate: "",
    expectedReturn: "",
    startDate: "",
    maturityDate: "",
    tenure: "",
    status: "Active",
    nominee: "",
    description: "",
  });

const fetchInvestments = async () => {
    try {
      setLoading(true);
      setError("");

      const householdResponse = await axios.get(
        `http://localhost:5000/api/households/${user.id}`
      );

      const householdId = householdResponse.data.household._id;

      const response = await axios.get(
        `http://localhost:5000/api/investments/${householdId}`
      );

      setInvestments(response.data.investments || []);
    } catch (error) {
      console.error("Get investments error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load investments."
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchInvestments();
  }, []);

const handleInvestmentChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  
const handleDeleteInvestment = async (investmentId) => {
  try {
    setError("");

    await axios.delete(
      `http://localhost:5000/api/investments/${investmentId}`
    );

    await fetchInvestments();
  } catch (error) {
    console.error("Delete investment error:", error);

    setError(
      error.response?.data?.message ||
        "Unable to delete investment."
    );
  }
};

const handleEditInvestment = (investment) => {
  setEditingInvestmentId(investment._id);

  setFormData({
    type: investment.type,
    name: investment.name,
    institution: investment.institution || "",
    investedAmount: investment.investedAmount,
    currentValue: investment.currentValue,
    interestRate: investment.interestRate ?? "",
    expectedReturn: investment.expectedReturn ?? "",
    startDate: investment.startDate
      ? investment.startDate.slice(0, 10)
      : "",
    maturityDate: investment.maturityDate
      ? investment.maturityDate.slice(0, 10)
      : "",
    tenure: investment.tenure || "",
    status: investment.status || "Active",
    nominee: investment.nominee || "",
    description: investment.description || "",
  });

  setShowAddForm(true);
};

  const handleInvestmentSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const householdResponse = await axios.get(
        `http://localhost:5000/api/households/${user.id}`
      );

      const householdId = householdResponse.data.household._id;

    const investmentData = {
       household: householdId,
       member: user.id,
       type: formData.type,
       name: formData.name,
       institution: formData.institution,
       investedAmount: Number(formData.investedAmount),
       currentValue: Number(formData.currentValue),
       interestRate:
         formData.interestRate === ""
           ? null
           : Number(formData.interestRate),
       expectedReturn:
         formData.expectedReturn === ""
           ? null
           : Number(formData.expectedReturn),
       startDate: formData.startDate,
       maturityDate:
         formData.maturityDate === ""
           ? null
           : formData.maturityDate,
       tenure: formData.tenure,
       status: formData.status,
       nominee: formData.nominee,
       description: formData.description,
     };

     if (editingInvestmentId) {
       await axios.put(
         `http://localhost:5000/api/investments/${editingInvestmentId}`,
        investmentData
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/investments",
        investmentData
      );
    }

      setFormData({
        type: "Fixed Deposit",
        name: "",
        institution: "",
        investedAmount: "",
        currentValue: "",
        interestRate: "",
        expectedReturn: "",
        startDate: "",
        maturityDate: "",
        tenure: "",
        status: "Active",
        nominee: "",
        description: "",
      });
      
      setEditingInvestmentId(null);
      setShowAddForm(false);

      await fetchInvestments();
    } catch (error) {
      console.error("Add investment error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to add investment."
      );
    }
  };

  const totalInvested = investments.reduce(
    (total, investment) =>
      total + investment.investedAmount,
    0
  );

  const currentPortfolioValue = investments.reduce(
    (total, investment) =>
      total + investment.currentValue,
    0
  );

  const totalProfitLoss =
    currentPortfolioValue - totalInvested;

  return (
    <div className="simple-page">

      <FamoraNavbar />

      <main className="simple-content  investments-content">

        <p className="eyebrow">HOUSEHOLD INVESTMENTS</p>

        <h1>Investments</h1>

        <p>
          Track your household portfolio, returns and
          investment maturity details in one place.
        </p>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <section className="dashboard-summary">

          <div className="dashboard-summary-item">
            <span>TOTAL INVESTED</span>
            <strong>
              ₹{totalInvested.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="dashboard-summary-item">
            <span>CURRENT VALUE</span>
            <strong>
              ₹{currentPortfolioValue.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="dashboard-summary-item">
            <span>PROFIT / LOSS</span>
            <strong>
              ₹{totalProfitLoss.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="dashboard-summary-item">
            <span>INVESTMENTS</span>
            <strong>{investments.length}</strong>
          </div>

        </section>

        <button
          className="primary-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Close Form" : "Add Investment"}
        </button>

        {showAddForm && (
          <form
            className="simple-form"
            onSubmit={handleInvestmentSubmit}
          >

            <h2>Add Investment</h2>

            <label>
              Investment Type
              <select
                name="type"
                value={formData.type}
                onChange={handleInvestmentChange}
              >
                <option>Mutual Fund</option>
                <option>Stocks</option>
                <option>Fixed Deposit</option>
                <option>Recurring Deposit</option>
                <option>Gold</option>
                <option>PPF</option>
                <option>NPS</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Investment Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInvestmentChange}
                placeholder="e.g. HDFC Fixed Deposit"
                required
              />
            </label>

            <label>
              Institution
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInvestmentChange}
                placeholder="e.g. HDFC Bank"
              />
            </label>

            <label>
              Invested Amount
              <input
                type="number"
                name="investedAmount"
                value={formData.investedAmount}
                onChange={handleInvestmentChange}
                min="0"
                required
              />
            </label>

            <label>
              Current Value
              <input
                type="number"
                name="currentValue"
                value={formData.currentValue}
                onChange={handleInvestmentChange}
                min="0"
                required
              />
            </label>

            <label>
              Interest Rate (%)
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleInvestmentChange}
                min="0"
                step="0.01"
              />
            </label>

            <label>
              Expected Return
              <input
                type="number"
                name="expectedReturn"
                value={formData.expectedReturn}
                onChange={handleInvestmentChange}
                min="0"
              />
            </label>

            <label>
              Start Date
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInvestmentChange}
                required
              />
            </label>

            <label>
              Maturity Date
              <input
                type="date"
                name="maturityDate"
                value={formData.maturityDate}
                onChange={handleInvestmentChange}
              />
            </label>

            <label>
              Tenure
              <input
                type="text"
                name="tenure"
                value={formData.tenure}
                onChange={handleInvestmentChange}
                placeholder="e.g. 12 months"
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleInvestmentChange}
              >
                <option>Active</option>
                <option>Matured</option>
              </select>
            </label>

            <label>
              Nominee
              <input
                type="text"
                name="nominee"
                value={formData.nominee}
                onChange={handleInvestmentChange}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInvestmentChange}
                placeholder="Optional notes"
              />
            </label>

            <button
              type="submit"
              className="primary-button"
            >
              Save Investment
            </button>

          </form>
        )}

        <section className="simple-list">

          <h2>Investment History</h2>

          {loading ? (
            <p>Loading investments...</p>
          ) : investments.length === 0 ? (
            <p>No investments added yet.</p>
          ) : (
            investments.map((investment) => (
              <div
                key={investment._id}
                className="simple-list-item"
              >
                <div>
                  <strong>{investment.name}</strong>

                  <p>
                    {investment.type}
                    {investment.institution
                      ? ` · ${investment.institution}`
                      : ""}
                  </p>

                  <p>
                    Invested: ₹
                    {investment.investedAmount.toLocaleString(
                      "en-IN"
                    )}
                    {" · "}
                    Current: ₹
                    {investment.currentValue.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  {investment.maturityDate && (
                    <p>
                      Maturity:{" "}
                      {new Date(
                        investment.maturityDate
                      ).toLocaleDateString("en-IN")}
                    </p>
                  )}

                  {investment.nominee && (
                     <p>
                        Nominee: {investment.nominee}
                    </p>
                  )}

                  {investment.description && (
                   <p>
                     Description: {investment.description}
                  </p>
                )}
                </div>

              <div className="simple-list-actions">
               <strong>
                 ₹
                 {(
                    investment.currentValue -
                    investment.investedAmount
                  ).toLocaleString("en-IN")}
               </strong>

               <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleEditInvestment(investment)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleDeleteInvestment(investment._id)}
                >
                  Delete
                </button>
               </div> 
              </div>
            ))
          )}

        </section>
        <div className="investments-footer">
         <Link
            to="/dashboard"
            className="secondary-button"
          >
            Back to Dashboard
          </Link>
         </div>     
      </main>
    </div>
  );
}

function Goals() {
  const user = JSON.parse(localStorage.getItem("famoraUser"));

  const [goals, setGoals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingGoalId, setEditingGoalId] = React.useState(null);

  const [formData, setFormData] = React.useState({
    name: "",
    category: "Emergency",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    status: "Active",
    description: "",
  });

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError("");

      const householdResponse = await axios.get(
        `http://localhost:5000/api/households/${user.id}`
      );

      const householdId = householdResponse.data.household._id;

      const response = await axios.get(
        `http://localhost:5000/api/goals/${householdId}`
      );

      setGoals(response.data.goals || []);
    } catch (error) {
      console.error("Get goals error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load goals."
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchGoals();
  }, []);

  const handleGoalChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleGoalSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const householdResponse = await axios.get(
        `http://localhost:5000/api/households/${user.id}`
      );

      const householdId = householdResponse.data.household._id;

      const goalData = {
        household: householdId,
        member: user.id,
        name: formData.name,
        category: formData.category,
        targetAmount: Number(formData.targetAmount),
        currentAmount:
          formData.currentAmount === ""
            ? 0
            : Number(formData.currentAmount),
        targetDate:
          formData.targetDate === ""
            ? null
            : formData.targetDate,
        status: formData.status,
        description: formData.description,
      };

      if (editingGoalId) {
        await axios.put(
          `http://localhost:5000/api/goals/${editingGoalId}`,
          goalData
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/goals",
          goalData
        );
      }

      setFormData({
        name: "",
        category: "Emergency",
        targetAmount: "",
        currentAmount: "",
        targetDate: "",
        status: "Active",
        description: "",
      });

      setEditingGoalId(null);
      setShowAddForm(false);

      await fetchGoals();
    } catch (error) {
      console.error("Save goal error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to save goal."
      );
    }
  };

  const handleEditGoal = (goal) => {
  console.log("EDIT CLICKED", goal);

  setEditingGoalId(goal._id);

  setFormData({
    name: goal.name,
    category: goal.category,
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    targetDate: goal.targetDate
      ? goal.targetDate.slice(0, 10)
      : "",
    status: goal.status || "Active",
    description: goal.description || "",
  });

  setShowAddForm(true);
};

  const handleDeleteGoal = async (goalId) => {
    try {
      setError("");

      await axios.delete(
        `http://localhost:5000/api/goals/${goalId}`
      );

      await fetchGoals();
    } catch (error) {
      console.error("Delete goal error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete goal."
      );
    }
  };

  const totalGoals = goals.length;

  const activeGoals = goals.filter(
    (goal) => goal.status === "Active"
  ).length;

  const completedGoals = goals.filter(
    (goal) => goal.status === "Completed"
  ).length;

  const totalSaved = goals.reduce(
    (total, goal) => total + goal.currentAmount,
    0
  );

  return (
    <div className="simple-page">

      <FamoraNavbar />

      <main className="simple-content goals-content">

        <p className="eyebrow">HOUSEHOLD SAVINGS</p>

        <h1>Savings Goals</h1>

        <p>
          Set meaningful savings targets and track your
          household progress in one place.
        </p>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <section className="dashboard-summary">

          <div className="dashboard-summary-item">
            <span>TOTAL GOALS</span>
            <strong>{totalGoals}</strong>
          </div>

          <div className="dashboard-summary-item">
            <span>ACTIVE GOALS</span>
            <strong>{activeGoals}</strong>
          </div>

          <div className="dashboard-summary-item">
            <span>COMPLETED</span>
            <strong>{completedGoals}</strong>
          </div>

          <div className="dashboard-summary-item">
            <span>TOTAL SAVED</span>
            <strong>
              ₹{totalSaved.toLocaleString("en-IN")}
            </strong>
          </div>

        </section>

        <button
          className="primary-button"
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingGoalId(null);
          }}
        >
          {showAddForm ? "Close Form" : "Create Goal"}
        </button>

        {showAddForm && (
          <form
            className="simple-form"
            onSubmit={handleGoalSubmit}
          >

            <h2>
              {editingGoalId
                ? "Edit Goal"
                : "Create Goal"}
            </h2>

            <label>
              Goal Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleGoalChange}
                placeholder="e.g. Emergency Fund"
                required
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleGoalChange}
              >
                <option>Emergency</option>
                <option>Travel</option>
                <option>Education</option>
                <option>Personal</option>
                <option>Vehicle</option>
                <option>Home</option>
                <option>Wedding</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Target Amount
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleGoalChange}
                min="0"
                required
              />
            </label>

            <label>
              Current Saved Amount
              <input
                type="number"
                name="currentAmount"
                value={formData.currentAmount}
                onChange={handleGoalChange}
                min="0"
              />
            </label>

            <label>
              Target Date
              <input
                type="date"
                name="targetDate"
                value={formData.targetDate}
                onChange={handleGoalChange}
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleGoalChange}
              >
                <option>Active</option>
                <option>Completed</option>
                <option>Paused</option>
              </select>
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleGoalChange}
                placeholder="Optional notes"
              />
            </label>

            <button
              type="submit"
              className="primary-button"
            >
              {editingGoalId
                ? "Update Goal"
                : "Save Goal"}
            </button>

          </form>
        )}

        <section className="simple-list">

          <h2>Your Goals</h2>

          {loading ? (
            <p>Loading goals...</p>
          ) : goals.length === 0 ? (
            <p>No savings goals added yet.</p>
          ) : (
            goals.map((goal) => {

              const progress =
                goal.targetAmount > 0
                  ? Math.min(
                      (goal.currentAmount /
                        goal.targetAmount) *
                        100,
                      100
                    )
                  : 0;

              const remaining = Math.max(
                goal.targetAmount -
                  goal.currentAmount,
                0
              );

              return (
                <div
                  key={goal._id}
                  className="simple-list-item goal-item"
                >

                  <div>

                    <strong>{goal.name}</strong>

                    <p>
                      {goal.category}
                      {" · "}
                      {goal.status}
                    </p>

                    <p>
                      ₹
                      {goal.currentAmount.toLocaleString(
                        "en-IN"
                      )}
                      {" / ₹"}
                      {goal.targetAmount.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <div className="goal-progress-track">
                      <div
                        className="goal-progress-fill"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    <p>
                      {progress.toFixed(1)}% complete
                      {" · "}
                      ₹
                      {remaining.toLocaleString(
                        "en-IN"
                      )}{" "}
                      remaining
                    </p>

                    {goal.targetDate && (
                      <p>
                        Target:{" "}
                        {new Date(
                          goal.targetDate
                        ).toLocaleDateString(
                          "en-IN"
                        )}
                      </p>
                    )}

                    {goal.description && (
                      <p>
                        {goal.description}
                      </p>
                    )}

                  </div>

                  <div className="simple-list-actions">

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => handleEditGoal(goal) }
                    >      
                      Edit
                    </button>
                      
                  

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        handleDeleteGoal(goal._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>
              );
            })
          )}

        </section>
        <div className="goals-footer">
           <Link
             to="/dashboard"
             className="secondary-button"
            >
              Back to Dashboard
            </Link>
          </div>

      </main>

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
        <Route path="/investments" element={<Investments />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;