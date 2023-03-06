import React, { useState, useEffect } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch list of projects from the API
    fetch('http://localhost:9292/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    // Delete project using the API
    fetch(`http://localhost:9292/projects/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setProjects(projects.filter(project => project.id !== id));
        }
      })
      .catch(error => console.log(error));
  }

  const handleProgressUpdate = (id, newProgress) => {
  

    fetch(`http://localhost:9292/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        progress: newProgress
      })
    })
      .then(response => {
        if (response.ok) {
          const updatedProjects = projects.map(project => {
            if (project.id === id) {
              return {
                ...project,
                progress: newProgress
              };
            }
            return project;
          });
          setProjects(updatedProjects);
        }
      })
      .catch(error => console.log(error));
  }

  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch list of members from the API
    fetch('http://localhost:9292/members')
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => console.log(error));
  }, []);

  const getRandomMembers = (project) => {
    const randomMembers = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * members.length);
      const member = members[randomIndex];
      randomMembers.push(member);
    }
    return randomMembers;
  }

  return (
    <div className='projects'>
      <h2>Available Projects</h2>
      <div className='projects_card'>
        {projects.map(project => (
          <div className='project' key={project.id}>
            <p>No: {project.id}</p>
            <p>Title: {project.title}</p>
           
            <p>Progress: {project.progress}</p>
            <p>Timeframe: {project.timeframe}</p>
            <p>created_at: {project.created_at}</p>
            <p>updated_at: {project.updated_at}</p>
            <div className='buttons'>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
              <button onClick={() => handleProgressUpdate(project.id, 'In Progress')}>
                InProgress
              </button>
              <button onClick={() => handleProgressUpdate(project.id, 'Complete')}>
                Mark as Complete
              </button>
             
            </div>
            <div className='members'>
              <h4>Members:</h4>
              <div>
                {getRandomMembers(project).map(member => (
                  <p key={member.id}>{member.name}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;