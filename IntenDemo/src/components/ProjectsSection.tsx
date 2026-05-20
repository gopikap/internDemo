// Concepts demonstrated: State, Lists & Mapping, Event Handling

import { useState } from "react";
import ProjectCard, { type Project } from "./ProjectCard";

// Static data — in a real app this would come from an API
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-featured online store with cart, checkout, and user auth.",
    tags: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    category: "Frontend",
  },
  {
    id: 2,
    title: "Task Manager API",
    description: "RESTful API for managing tasks with JWT authentication.",
    tags: ["Node.js", "Express", "PostgreSQL"],
    liveUrl: "#",
    category: "Backend",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather app with charts using OpenWeatherMap API.",
    tags: ["React", "TypeScript", "Chart.js"],
    liveUrl: "#",
    category: "Frontend",
  },
  {
    id: 4,
    title: "Blog CMS",
    description:
      "Content management system with markdown editor and SEO support.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    category: "Backend",
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description:
      "Mobile-first app to log workouts, set goals, and track progress.",
    tags: ["React Native", "Redux", "Firebase"],
    liveUrl: "#",
    category: "Mobile",
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time chat with rooms, notifications, and file sharing.",
    tags: ["React", "Socket.io", "Node.js"],
    liveUrl: "#",
    category: "Frontend",
  },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Mobile"];

const ProjectsSection = () => {
  // State: which category filter is active
  const [activeFilter, setActiveFilter] = useState("All");

  // Derived value from state — recomputed on every render
  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section className="section projects-section">
      <h2 className="section-title">Projects</h2>

      {/* Event Handling + Lists & Mapping: filter buttons */}
      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lists & Mapping: render filtered project cards */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="empty-state">No projects in this category.</p>
      )}
    </section>
  );
};

export default ProjectsSection;
