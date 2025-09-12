import { useState, useEffect } from 'react';
import dataService from '../services/dataService';
import '../assets/styles/home.css';

// Project Modal Component for Admin
function AdminProjectModal({ project, onSave, onClose }) {
  const [title, setTitle] = useState(project?.title || '');
  const [desc, setDesc] = useState(project?.desc || '');
  const [desktopImg, setDesktopImg] = useState(project?.desktopImg || '');
  const [mobileImg, setMobileImg] = useState(project?.mobileImg || '');
  const [link, setLink] = useState(project?.link || '');

  // Ultra-professional quality image handler
  const handleFile = (file, setter) => {
    if (!file) return;
    
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const reader = new FileReader();
    reader.onload = e => {
      img.onload = () => {
        const maxWidth = 800;
        const maxHeight = 600;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.filter = 'none';
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.97);
        setter(compressedDataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.8)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,overflowY:'auto'}} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{background:'rgba(255,255,255,0.95)',backdropFilter:'blur(15px)',padding:'2.5rem',borderRadius:'20px',boxShadow:'0 20px 40px rgba(0,0,0,0.3)',minWidth:'400px',maxWidth:'500px',maxHeight:'90vh',overflowY:'auto',border:'1px solid rgba(255,255,255,0.2)',position:'relative',margin:'2rem'}} onClick={(e) => e.stopPropagation()}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:'4px',background:'linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)'}}></div>
        <h2 style={{color:'#2d3748',marginBottom:'1.5rem',fontSize:'1.8rem',fontWeight:'700',textAlign:'center'}}>
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>
        <input placeholder="Project Title" value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%',marginBottom:'1rem',background:'rgba(255,255,255,0.8)',color:'#2d3748',border:'2px solid #e2e8f0',padding:'0.8rem',borderRadius:'12px',fontSize:'1rem',transition:'border-color 0.3s',outline:'none'}} onFocus={e=>e.target.style.borderColor='#4f46e5'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
        <textarea placeholder="Project Description (Use • for bullet points or start lines with - for lists)" value={desc} onChange={e=>setDesc(e.target.value)} style={{width:'100%',marginBottom:'1rem',background:'rgba(255,255,255,0.8)',color:'#2d3748',border:'2px solid #e2e8f0',padding:'0.8rem',borderRadius:'12px',fontSize:'1rem',transition:'border-color 0.3s',outline:'none',minHeight:'100px',resize:'vertical',fontFamily:'inherit'}} onFocus={e=>e.target.style.borderColor='#4f46e5'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
        
        <div style={{marginBottom:'1rem'}}>
          <label style={{color:'#4f46e5',fontWeight:'600',marginBottom:'0.5rem',display:'block'}}>Desktop Image</label>
          <div style={{border:'2px dashed #4f46e5',borderRadius:'12px',padding:'1rem',background:'rgba(79,70,229,0.05)',transition:'all 0.3s',cursor:'pointer'}}
            onDragOver={e=>{e.preventDefault();e.currentTarget.style.background='rgba(79,70,229,0.1)';}}
            onDragLeave={e=>e.currentTarget.style.background='rgba(79,70,229,0.05)'}
            onDrop={e=>{e.preventDefault();e.currentTarget.style.background='rgba(79,70,229,0.05)';if(e.dataTransfer.files[0])handleFile(e.dataTransfer.files[0],setDesktopImg);}}>
            <input type="file" accept="image/*" style={{width:'100%',marginBottom:'0.5rem',color:'#4f46e5'}} onChange={e=>{if(e.target.files[0])handleFile(e.target.files[0],setDesktopImg);}} />
            {desktopImg && <img src={desktopImg} alt="Desktop preview" style={{width:'120px',marginTop:'0.5rem',borderRadius:'8px',boxShadow:'0 4px 8px rgba(0,0,0,0.1)'}} />}
            <div style={{color:'#6b7280',fontSize:'0.9rem',textAlign:'center'}}>Drag & drop or click to select desktop image</div>
          </div>
        </div>
        
        <div style={{marginBottom:'1rem'}}>
          <label style={{color:'#4f46e5',fontWeight:'600',marginBottom:'0.5rem',display:'block'}}>Mobile Image</label>
          <div style={{border:'2px dashed #4f46e5',borderRadius:'12px',padding:'1rem',background:'rgba(79,70,229,0.05)',transition:'all 0.3s',cursor:'pointer'}}
            onDragOver={e=>{e.preventDefault();e.currentTarget.style.background='rgba(79,70,229,0.1)';}}
            onDragLeave={e=>e.currentTarget.style.background='rgba(79,70,229,0.05)'}
            onDrop={e=>{e.preventDefault();e.currentTarget.style.background='rgba(79,70,229,0.05)';if(e.dataTransfer.files[0])handleFile(e.dataTransfer.files[0],setMobileImg);}}>
            <input type="file" accept="image/*" style={{width:'100%',marginBottom:'0.5rem',color:'#4f46e5'}} onChange={e=>{if(e.target.files[0])handleFile(e.target.files[0],setMobileImg);}} />
            {mobileImg && <img src={mobileImg} alt="Mobile preview" style={{width:'60px',marginTop:'0.5rem',borderRadius:'8px',boxShadow:'0 4px 8px rgba(0,0,0,0.1)'}} />}
            <div style={{color:'#6b7280',fontSize:'0.9rem',textAlign:'center'}}>Drag & drop or click to select mobile image</div>
          </div>
        </div>
        
        <input placeholder="Website Link (https://...)" value={link} onChange={e=>setLink(e.target.value)} style={{width:'100%',marginBottom:'1.5rem',background:'rgba(255,255,255,0.8)',color:'#2d3748',border:'2px solid #e2e8f0',padding:'0.8rem',borderRadius:'12px',fontSize:'1rem',transition:'border-color 0.3s',outline:'none'}} onFocus={e=>e.target.style.borderColor='#4f46e5'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
        
        <div style={{display:'flex',gap:'1rem',justifyContent:'center'}}>
          <button style={{background:'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',color:'white',border:'none',padding:'0.8rem 2rem',borderRadius:'50px',fontWeight:'600',cursor:'pointer',transition:'all 0.3s',boxShadow:'0 4px 15px rgba(79,70,229,0.3)',fontSize:'1rem'}} onClick={()=>{
            if (title.trim() && desc.trim() && link.trim()) {
              onSave({
                ...(project || {}),
                title: title.trim(), 
                desc: desc.trim(), 
                desktopImg, 
                mobileImg, 
                link: link.trim()
              });
            } else {
              alert('Please fill in title, description, and website link');
            }
          }}>Save Project</button>
          <button style={{background:'rgba(107,114,128,0.1)',color:'#6b7280',border:'2px solid #e5e7eb',padding:'0.8rem 2rem',borderRadius:'50px',fontWeight:'600',cursor:'pointer',transition:'all 0.3s',fontSize:'1rem'}} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function Admin({ isAdmin, setIsAdmin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  // Load projects when admin logs in
  useEffect(() => {
    if (isAdmin) {
      loadProjects();
    }
  }, [isAdmin]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const list = await dataService.getProjects();
      setProjects(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const saveProjects = async (newProjects) => {
    try {
      setProjects(newProjects);
      await dataService.saveAll(newProjects);
    } catch (error) {
      console.error('Error saving projects:', error);
      alert('Error saving projects. Please try again.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const ok = password === (import.meta.env.VITE_ADMIN_PASSWORD || 'admin123');
    if (ok) {
      setIsAdmin(true);
      setError('');
      setPassword('');
    } else {
      setError('Invalid password');
    }
  };

  const genId = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2,8)}`);

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      // Edit existing project by id
      const updated = projects.map(p =>
        p.id === editingProject.id ? { ...p, ...projectData, id: editingProject.id } : p
      );
      saveProjects(updated);
    } else {
      // Add new project with generated id
      const withId = { id: genId(), ...projectData };
      saveProjects([...projects, withId]);
    }
    setShowModal(false);
    setEditingProject(null);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDeleteProject = (project) => {
    if (confirm('Delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== project.id);
      saveProjects(updatedProjects);
    }
  };

  // Drag and drop for reordering
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === dropIndex) return;
    
    const newProjects = [...projects];
    const draggedProject = newProjects[draggedItem];
    
    newProjects.splice(draggedItem, 1);
    newProjects.splice(dropIndex, 0, draggedProject);
    
    saveProjects(newProjects);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  if (!isAdmin) {
    return (
      <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(15px)', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2d3748', fontSize: '2.5rem', fontWeight: '700' }}>Admin Login</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                padding: '1rem', 
                borderRadius: '12px', 
                border: '2px solid #e2e8f0', 
                fontSize: '1rem',
                background: 'rgba(255,255,255,0.8)',
                transition: 'border-color 0.3s',
                outline: 'none'
              }}
              onFocus={e=>e.target.style.borderColor='#4f46e5'}
              onBlur={e=>e.target.style.borderColor='#e2e8f0'}
            />
            {error && <div style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
            <button 
              type="submit" 
              style={{ 
                padding: '1rem 2rem', 
                borderRadius: '50px',
                border: 'none',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(79,70,229,0.3)'
              }}
            >
              Login to Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="intro">
        <h1>Admin Panel</h1>
        <p>Manage Shopify Projects</p>
      </header>
      
      <section className="portfolio">
        <div className="portfolio-header">
          <div>
            <h2>Projects Management</h2>
            <p style={{margin:'0.5rem 0',color:'#6b7280',fontSize:'0.9rem'}}>
              {projects.length} project{projects.length !== 1 ? 's' : ''} 
              {projects.length > 1 && ' • Drag to reorder'}
            </p>
          </div>
          <button className="add-project-btn" onClick={() => {setEditingProject(null); setShowModal(true);}}>
            Add New Project
          </button>
        </div>
        
        <div className="projects-list">
          {loading && (
            <div style={{color:'#888', textAlign: 'center', padding: '3rem'}}>
              Loading projects...
            </div>
          )}
          {!loading && projects.length === 0 && (
            <div style={{color:'#888', textAlign: 'center', padding: '3rem'}}>
              No projects yet. Click "Add New Project" to get started.
            </div>
          )}
          {!loading && projects.map((project, idx) => (
            <div
              key={project.id || idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              style={{
                opacity: draggedItem === idx ? 0.5 : 1,
                cursor: 'grab',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                position: 'relative',
                transform: draggedItem === idx ? 'rotate(2deg)' : 'none'
              }}
            >
              {/* Drag Handle */}
              <div style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(79, 70, 229, 0.1)',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'grab',
                opacity: 0.7,
                transition: 'opacity 0.3s ease'
              }}>
                <div style={{
                  width: '4px',
                  height: '20px',
                  background: 'repeating-linear-gradient(to bottom, #4f46e5 0px, #4f46e5 3px, transparent 3px, transparent 6px)',
                  margin: '0 2px',
                  display: 'inline-block'
                }}></div>
                <div style={{
                  width: '4px',
                  height: '20px',
                  background: 'repeating-linear-gradient(to bottom, #4f46e5 0px, #4f46e5 3px, transparent 3px, transparent 6px)',
                  margin: '0 2px',
                  display: 'inline-block'
                }}></div>
              </div>
              
              <div className="project-card" style={{ marginLeft: '2rem' }}>
                <div className="project-images">
                  <img src={project.desktopImg} alt={project.title + ' desktop'} className="desktop-img" />
                  <img src={project.mobileImg} alt={project.title + ' mobile'} className="mobile-img" />
                </div>
                
                <div className="project-content">
                  <div className="project-title">{project.title}</div>
                  <div className="project-desc" style={{whiteSpace: 'pre-line', lineHeight: '1.4'}}>
                    {project.desc}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    Visit Website
                  </a>
                </div>

                <div className="project-actions">
      <button className="edit-btn" onClick={() => handleEditProject(project)}>Edit</button>
      <button className="delete-btn" onClick={() => handleDeleteProject(project)}>Delete</button>
                </div>
              </div>
            </div>
    ))}
        </div>
        
        {showModal && (
          <AdminProjectModal 
            project={editingProject}
            onSave={handleSaveProject} 
            onClose={() => {setShowModal(false); setEditingProject(null);}} 
          />
        )}
      </section>
    </div>
  );
}
