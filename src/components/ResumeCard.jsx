import React, { useState } from 'react';

const ResumeCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container">
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-face front">
          {/* Your existing front resume content */}
          <button className="flip-button" onClick={handleFlip}>
            View Back →
          </button>
        </div>
        <div className="card-face back">
          {/* Back side content */}
          <h2>Additional Information</h2>
          <div className="back-content">
            <section className="skills">
              <h3>Skills</h3>
              <ul>
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
              </ul>
            </section>
            
            <section className="projects">
              <h3>Projects</h3>
              <ul>
                <li>Project 1</li>
                <li>Project 2</li>
                <li>Project 3</li>
              </ul>
            </section>

            <section className="certifications">
              <h3>Certifications</h3>
              <ul>
                <li>Certification 1</li>
                <li>Certification 2</li>
              </ul>
            </section>
          </div>
          <button className="flip-button" onClick={handleFlip}>
            ← View Front
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard; 