import React, { useState, useEffect } from 'react';

const NewProject = ({ onNewProject }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [progress, setProgress] = useState('');
  const [created_at, setCreated_at] = useState('');
  const [updated_at, setUpdated_at] = useState('')




  const [users, setUsers] = useState([]);
  const [addedUser, setAddedUser] = useState('');

  const handleNew = (e) => {
    e.preventDefault();

    // Adding a new project
    fetch('http://localhost:9292/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        title: title,
        progress: progress,
        timeframe: timeframe,
        created_at: created_at,
        updated_at: updated_at,
      })
    })
      .then(response => response.json())
      .then(data => {
        onNewProject(data);
        setId('');
        setTitle('');
        setProgress('');
        setTimeframe('');
        setCreated_at('');
        setUpdated_at('')

      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    // Fetching users 
    fetch('http://localhost:9292/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  const handleUserChange = (e) => {
    setAddedUser(e.target.value);
  }

  return (
    <div className='new_project'>
      <h2>New Project</h2>
      <form className='form' onSubmit={handleNew}>
      <label>
        Id:
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
    </label>
        <label>
        Title:
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    </label>
   
    <label>
      Timeframe:
      <input type="text" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} />
    </label>
    <label>
      Progress:
      <input type="text" value={progress} onChange={(e) => setProgress(e.target.value)} />
    </label>
    <label>
      Created_at:
      <input type="text" value={created_at} onChange={(e) => setCreated_at(e.target.value)} />
    </label>
    <label>
      updated_at:
      <input type="text" value={updated_at} onChange={(e) => setUpdated_at(e.target.value)} />
    </label>
    <label>
      Assign User:
      <select value={addedUser} onChange={handleUserChange}>
        <option value="">Select user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </label>
    <button type="submit"> Add New Project</button>
  </form>
</div>
);
};

export default NewProject;
