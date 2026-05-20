// Concepts demonstrated: Props, Event Handling, Lists & Mapping

import { useAuth } from "../context/useAuth";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isLoggedIn?: boolean;
}

// A plain array — we'll .map() over it to render nav buttons (Lists & Mapping)
const NAV_ITEMS = [
  { label: "Home", view: "home" },
  { label: "Login", view: "login" },
  { label: "Sign Up", view: "signup" },
  { label: "API Demo", view: "api-demo" },
  { label: "Custom Hook Demo", view: "custom-hook-demo" },
];

// Props: currentView, onNavigate, isLoggedIn are passed down from App.tsx  //isLoggedIn
const Navbar = ({ currentView, onNavigate }: NavbarProps) => {
  const { user, logout } = useAuth();
  console.log("Navbar render - currentView:", currentView, "user:", user);
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => onNavigate("home")}>
        <span className="brand-icon">{"</>"}</span>
        MyPortfolio
      </div>

      <ul className="nav-links">
        {/* Lists & Mapping: .map() turns the array into React elements */}
        {NAV_ITEMS.map(({ label, view }) => (
          <li key={view}>
            {/* Event Handling: onClick calls the onNavigate prop */}
            <button
              className={`nav-btn ${currentView === view ? "active" : ""}`}
              onClick={() => onNavigate(view)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Conditional render based on prop value */}
      {user ? (
        <span className="logged-in-badge" onClick={logout}>
          Logged In - {user.name}
        </span>
      ) : (
        <span className="logged-out-badge">Guest</span>
      )}
    </nav>
  );
};

export default Navbar;
