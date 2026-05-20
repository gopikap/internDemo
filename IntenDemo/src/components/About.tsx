// Concepts demonstrated: Props, State, Event Handling

import { useState } from 'react'

interface AboutProps {
  fullBio: string // prop passed from parent
}

const About = ({ fullBio }: AboutProps) => {
  // State: controls whether the full bio is shown
  const [isExpanded, setIsExpanded] = useState(false)

  const preview = fullBio.slice(0, 200) + '...'

  return (
    <section className="section about-section">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        {/* State determines which version of the text to render */}
        <p>{isExpanded ? fullBio : preview}</p>

        {/* Event Handling: toggle state on click */}
        <button
          className="btn-text"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? '← Read Less' : 'Read More →'}
        </button>
      </div>
    </section>
  )
}

export default About
