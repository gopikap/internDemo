// Concepts demonstrated: Props, Lists & Mapping (tags)

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  category: string;
}

interface ProjectCardProps {
  project: Project; // entire project object passed as a single prop
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <span className="project-category">{project.category}</span>
      </div>

      <p className="project-desc">{project.description}</p>

      <div className="project-tags">
        {/* Lists & Mapping: map over the tags array */}
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
      >
        View Project →
      </a>
    </div>
  );
};

export default ProjectCard;
