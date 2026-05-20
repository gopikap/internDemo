// Concepts demonstrated: State, Event Handling, Props (passing data down to children)
// This is the root component — it owns the app's navigation state.

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsList, { type Skill } from "./components/SkillsList";
import ProjectsSection from "./components/ProjectsSection";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ApiDemo from "./components/ApiDemo";
import ContactForm from "./components/ContactForm";
import "./App.css";
import Timer from "./components/RefSample";
import { useAuth } from "./context/useAuth";
import PostList from "./components/SampleApiHook";
import AppRoutes from "./Routes";

type View = "home" | "login" | "signup" | "api-demo" | "custom-hook-demo";

// Static portfolio data lives here and is passed as props to children
const PORTFOLIO = {
  name: "Alex Johnson",
  title: "Full Stack Developer",
  bio: "Passionate developer crafting beautiful web experiences with React & TypeScript.",
  fullBio: `I am a full stack developer with 5+ years of experience building scalable web
applications. I love working with React, TypeScript, and Node.js. Passionate about clean
code, great user experiences, and continuous learning. When not coding I enjoy hiking,
reading sci-fi novels, and contributing to open-source projects.`,
  skills: [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "CSS / Tailwind", level: 88, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Python", level: 72, category: "Backend" },
    { name: "PostgreSQL", level: 70, category: "Database" },
    { name: "Docker", level: 65, category: "DevOps" },
    { name: "Git", level: 93, category: "Tools" },
  ] satisfies Skill[],
};

function App() {
  // State: which page is currently visible
  const [currentView, setCurrentView] = useState<View>("home");
  // State: whether the user has logged in (shared across views)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigate = (view: string) => setCurrentView(view as View);
  const { login } = useAuth();

  return (
    <div className="app">
      Props: pass state values and setter callbacks down to Navbar
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
      />
      <main className="main-content">
        {/* Conditional rendering based on state */}
        {currentView === "home" && (
          <>
            <Hero
              name={PORTFOLIO.name}
              title={PORTFOLIO.title}
              bio={PORTFOLIO.bio}
              user={{ firstname: "aAliya", lastname: "Hamidha" }}
            />
            <About fullBio={PORTFOLIO.fullBio} />
            <SkillsList skills={PORTFOLIO.skills} />
            <ProjectsSection />
            <ContactForm />
            <Timer />
          </>
        )}

        {currentView === "login" && (
          <LoginForm
            onLoginSuccess={() => {
              login({ id: 1, name: "Demo User", email: "demo@example.com" });
              setCurrentView("home");
              setIsLoggedIn(true);
            }}
            currentView={currentView}
          />
        )}

        {currentView === "signup" && (
          <SignupForm onSignupSuccess={() => setCurrentView("login")} />
        )}

        {currentView === "api-demo" && <ApiDemo />}
        {currentView === "custom-hook-demo" && <PostList />}
      </main>
    </div>
  );
}

export default App;
