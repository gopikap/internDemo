// Concepts demonstrated: Props, Lists & Mapping

export interface Skill {
  name: string
  level: number // 0–100
  category: string
}

interface SkillsListProps {
  skills: Skill[] // array of objects passed as a prop
}

const SkillsList = ({ skills }: SkillsListProps) => {
  return (
    <section className="section skills-section">
      <h2 className="section-title">Skills</h2>

      <div className="skills-grid">
        {/* Lists & Mapping: .map() renders one card per skill */}
        {skills.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>

            <div className="skill-bar">
              {/* Inline style driven by the skill's level value */}
              <div className="skill-fill" style={{ width: `${skill.level}%` }} />
            </div>

            <span className="skill-category">{skill.category}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillsList
