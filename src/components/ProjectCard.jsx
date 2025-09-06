import '../assets/styles/ProjectCard.css';

export default function ProjectCard({ desktopImg, mobileImg, title, desc, link, onEdit, onDelete, showActions = true }) {
  // Format description to handle bullet points
  const formatDescription = (text) => {
    if (!text) return '';
    
    // Split by lines and process each line
    const lines = text.split('\n').map(line => {
      line = line.trim();
      // Convert lines starting with - or • to bullet points
      if (line.startsWith('- ')) {
        return '• ' + line.substring(2);
      } else if (line.startsWith('•')) {
        return line;
      }
      return line;
    }).filter(line => line.length > 0); // Remove empty lines
    
    return lines.join('\n');
  };

  return (
    <div className="project-card">
      <div className="project-images">
        <img src={desktopImg} alt={title + ' desktop'} className="desktop-img" />
        <img src={mobileImg} alt={title + ' mobile'} className="mobile-img" />
      </div>
      
      <div className="project-content">
        <div className="project-title">{title}</div>
        <div className="project-desc" style={{whiteSpace: 'pre-line', lineHeight: '1.4'}}>{formatDescription(desc)}</div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">Visit Website</a>
      </div>

      {showActions && onEdit && onDelete && (
        <div className="project-actions">
          <button className="edit-btn" onClick={onEdit}>Edit</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
