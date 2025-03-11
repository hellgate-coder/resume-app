import { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import './App.css'

function App() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('resumeFormData')
    return savedData ? JSON.parse(savedData) : {
      name: '',
      title: '',
      contact: {
        email: '',
        phone: '',
        location: '',
        linkedin: ''
      },
      education: [],
      experience: [],
      skills: {
        frontend: '',
        backend: '',
        databases: '',
        otherSkills: ''
      },
      projects: []
    }
  })

  const [resumeData, setResumeData] = useState(() => {
    const savedResumeData = localStorage.getItem('resumeFormData')
    return savedResumeData ? JSON.parse(savedResumeData) : null
  })

  const [imagePreview, setImagePreview] = useState(() => {
    return localStorage.getItem('imagePreview') || null
  })

  const resumeCardRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('resumeFormData', JSON.stringify(formData))
    setResumeData(formData)
  }, [formData])

  useEffect(() => {
    if (imagePreview) {
      localStorage.setItem('imagePreview', imagePreview)
    }
  }, [imagePreview])

  // Handle basic input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle contact input changes
  const handleContactChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value
      }
    }))
  }

  // Handle skills input
  const handleSkillsChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [name]: value
      }
    }))
  }

  // Handle education input
  const handleEducationAdd = () => {
    const newEducation = {
      degree: document.getElementById('degree').value,
      institution: document.getElementById('institution').value,
      date: document.getElementById('eduDate').value
    }
    if (newEducation.degree && newEducation.institution) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }))
      // Clear inputs
      document.getElementById('degree').value = ''
      document.getElementById('institution').value = ''
      document.getElementById('eduDate').value = ''
    }
  }

  // Handle experience input
  const handleExperienceAdd = () => {
    const newExperience = {
      position: document.getElementById('position').value,
      company: document.getElementById('company').value,
      date: document.getElementById('date').value
    }
    if (newExperience.position && newExperience.company) {
      const updatedFormData = {
        ...formData,
        experience: [...formData.experience, newExperience]
      }
      setFormData(updatedFormData)
      // Clear inputs
      document.getElementById('position').value = ''
      document.getElementById('company').value = ''
      document.getElementById('date').value = ''
    }
  }

  // Handle project input
  const handleProjectAdd = () => {
    const newProject = {
      name: document.getElementById('projectName').value,
      date: document.getElementById('projectDate').value,
      description: document.getElementById('projectDesc').value
    }
    if (newProject.name && newProject.description) {
      const updatedFormData = {
        ...formData,
        projects: [...formData.projects, newProject]
      }
      setFormData(updatedFormData)
      // Clear inputs
      document.getElementById('projectName').value = ''
      document.getElementById('projectDate').value = ''
      document.getElementById('projectDesc').value = ''
    }
  }

  // Clear all data
  const handleClearAll = () => {
    const emptyData = {
      name: '',
      title: '',
      contact: {
        email: '',
        phone: '',
        location: '',
        linkedin: ''
      },
      education: [],
      experience: [],
      skills: {
        frontend: '',
        backend: '',
        databases: '',
        otherSkills: ''
      },
      projects: []
    }
    setFormData(emptyData)
    setResumeData(emptyData)
    setImagePreview(null)
    localStorage.clear()
  }

  // Generate button now just ensures everything is up to date
  const handleGenerateResume = () => {
    setResumeData(formData)
  }

  // Add download function
  const handleDownload = async () => {
    if (!resumeCardRef.current) return

    try {
      const canvas = await html2canvas(resumeCardRef.current, {
        scale: 2, // Higher resolution
        backgroundColor: '#f0f0f0',
        logging: false,
        useCORS: true // Enable if your image is from a different domain
      })

      // Convert to JPEG
      const image = canvas.toDataURL('image/jpeg', 1.0)
      
      // Create download link
      const link = document.createElement('a')
      link.download = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-resume.jpg`
      link.href = image
      link.click()
    } catch (err) {
      console.error('Error generating image:', err)
    }
  }

  return (
    <div className="container">
      <div className="controls">
        <h2>Resume Card Generator</h2>
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0]
            if (file) {
              const reader = new FileReader()
              reader.onloadend = () => setImagePreview(reader.result)
              reader.readAsDataURL(file)
            }
          }}
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Professional Title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <h3>Contact Information</h3>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.contact.email}
          onChange={handleContactChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.contact.phone}
          onChange={handleContactChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.contact.location}
          onChange={handleContactChange}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={formData.contact.linkedin}
          onChange={handleContactChange}
        />

        <h3>Education</h3>
        <input id="degree" type="text" placeholder="Degree/Course" />
        <input id="institution" type="text" placeholder="Institution" />
        <input id="eduDate" type="text" placeholder="Date" />
        <button onClick={handleEducationAdd}>Add Education</button>

        <h3>Skills</h3>
        <input
          type="text"
          name="frontend"
          placeholder="Frontend Skills (comma separated)"
          onChange={handleSkillsChange}
        />
        <input
          type="text"
          name="backend"
          placeholder="Backend Skills (comma separated)"
          onChange={handleSkillsChange}
        />
        <input
          type="text"
          name="databases"
          placeholder="Databases"
          onChange={handleSkillsChange}
        />
        <input
          type="text"
          name="otherSkills"
          placeholder="Other Skills"
          onChange={handleSkillsChange}
        />

        <h3>Experience</h3>
        <input id="position" type="text" placeholder="Position" />
        <input id="company" type="text" placeholder="Company" />
        <input id="date" type="text" placeholder="Date" />
        <button onClick={handleExperienceAdd}>Add Experience</button>

        <h3>Projects</h3>
        <input id="projectName" type="text" placeholder="Project Name" />
        <input id="projectDate" type="text" placeholder="Date" />
        <textarea id="projectDesc" placeholder="Project Description" />
        <button onClick={handleProjectAdd}>Add Project</button>

        <button className="generate-btn" onClick={handleGenerateResume}>
          Generate Resume
        </button>
        
        {resumeData && (
          <button className="download-btn" onClick={handleDownload}>
            Download as JPEG
          </button>
        )}
        
        <button className="clear-btn" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      {resumeData && (
        <div className="resume-card" ref={resumeCardRef}>
          <div className="resume-header">
            <div className="resume-text">
              <h1>{resumeData.name}</h1>
              <p className="title">{resumeData.title}</p>
              <div className="contact-info">
                {resumeData.contact.email && <p>{resumeData.contact.email}</p>}
                {resumeData.contact.phone && <p>{resumeData.contact.phone}</p>}
                {resumeData.contact.location && <p>{resumeData.contact.location}</p>}
                {resumeData.contact.linkedin && <p>{resumeData.contact.linkedin}</p>}
              </div>
            </div>
            <div className="profile-image">
              {imagePreview && <img src={imagePreview} alt="Profile" />}
            </div>
          </div>

          <div className="section">
            <h2>EXPERIENCE</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index}>
                <p>{exp.position} | {exp.company}</p>
                <p>{exp.date}</p>
              </div>
            ))}
          </div>

          <div className="section">
            <h2>SKILLS</h2>
            {resumeData.skills.frontend && (
              <p>Frontend: {resumeData.skills.frontend}</p>
            )}
            {resumeData.skills.backend && (
              <p>Backend: {resumeData.skills.backend}</p>
            )}
            {resumeData.skills.databases && (
              <p>Databases: {resumeData.skills.databases}</p>
            )}
            {resumeData.skills.otherSkills && (
              <p>Other skills: {resumeData.skills.otherSkills}</p>
            )}
          </div>

          <div className="section">
            <h2>Projects:</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="project">
                <p>{project.name} • {project.date}</p>
                <p className="project-bullet">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
