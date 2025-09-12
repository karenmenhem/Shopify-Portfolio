import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import dataService from '../services/dataService';
import '../assets/styles/home.css';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load projects from data service on mount
  useEffect(() => {
    (async () => {
      try {
        const list = await dataService.getProjects();
        setProjects(list);
      } finally {
        setLoading(false);
      }
    })();
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
          {loading && (
            <div style={{color:'#888', textAlign: 'center', padding: '3rem'}}>
              Loading projects...
            </div>
          )}
          {!loading && projects.length === 0 && (
            <div style={{color:'#888', textAlign: 'center', padding: '3rem'}}>
              No projects to display yet.
            </div>
          )}
          {!loading && projects.map((project, idx) => (
            <div key={project.id || idx} style={{ position: 'relative' }}>
              <ProjectCard {...project} showActions={false} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}