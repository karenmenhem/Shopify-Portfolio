import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import '../assets/styles/home.css';

export default function Home() {
  const [projects, setProjects] = useState([]);

  // Load projects from localStorage on component mount
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('shopifyProjects');
      setProjects(savedProjects ? JSON.parse(savedProjects) : []);
    } catch (error) {
      console.error('Error loading projects from localStorage:', error);
      setProjects([]);
    }
  }, []);

  return (
    <div className="home-container">
      <header className="intro">
        <h1>Hi, I'm Karen Menhem</h1>
        <p>CCE Student | Web Developer | Shopify Expert</p>
      </header>
      <section className="portfolio">
        <div className="portfolio-header">
          <div>
            <h2>Shopify Projects</h2>
          </div>
        </div>
        <div className="projects-list">
          {projects.length === 0 && (
            <div style={{color:'#888', textAlign: 'center', padding: '3rem'}}>
              No projects to display yet.
            </div>
          )}
          {projects.map((project, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <ProjectCard 
                {...project}
                // No edit/delete functionality for visitors
                showActions={false}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}