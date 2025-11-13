import React, { useState, useEffect } from 'react';

const fs = window.require ? window.require('fs') : null;
const path = window.require ? window.require('path') : null;
const app = window.require ? window.require('electron').remote.app : null;

function App() {
  const [clients, setClients] = useState([]);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddProject, setShowAddProject] = useState({});
  const [editingClient, setEditingClient] = useState(null);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '' });
  const [newProject, setNewProject] = useState({ title: '', details: '', status: 'Pending', deliveryDate: '' });

  // Data file path
  const getDataPath = () => {
    if (app) {
      return path.join(app.getPath('userData'), 'data.json');
    }
    return null;
  };

  // Load data from file
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const dataPath = getDataPath();
    if (dataPath && fs && fs.existsSync(dataPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        setClients(data.clients || []);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  };

  const saveData = (updatedClients) => {
    const dataPath = getDataPath();
    if (dataPath && fs) {
      try {
        const data = { clients: updatedClients };
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  const addClient = () => {
    if (!newClient.name) {
      alert('Please enter client name');
      return;
    }
    const client = {
      ...newClient,
      id: Date.now(),
      projects: [],
      createdAt: new Date().toISOString()
    };
    const updated = [...clients, client];
    setClients(updated);
    saveData(updated);
    setNewClient({ name: '', email: '', phone: '', address: '' });
    setShowAddClient(false);
  };

  const updateClient = () => {
    if (!editingClient || !newClient.name) {
      alert('Please enter client name');
      return;
    }
    const updated = clients.map(client =>
      client.id === editingClient.id ? { ...client, ...newClient } : client
    );
    setClients(updated);
    saveData(updated);
    setEditingClient(null);
    setNewClient({ name: '', email: '', phone: '', address: '' });
  };

  const deleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      const updated = clients.filter(c => c.id !== clientId);
      setClients(updated);
      saveData(updated);
    }
  };

  const startEditClient = (client) => {
    setEditingClient(client);
    setNewClient({ name: client.name, email: client.email, phone: client.phone, address: client.address });
    setShowAddClient(true);
  };

  const addProject = (clientId) => {
    if (!newProject.title) {
      alert('Please enter project title');
      return;
    }
    const project = {
      ...newProject,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    const updated = clients.map(client =>
      client.id === clientId ? { ...client, projects: [...client.projects, project] } : client
    );
    setClients(updated);
    saveData(updated);
    setShowAddProject({ ...showAddProject, [clientId]: false });
    setNewProject({ title: '', details: '', status: 'Pending', deliveryDate: '' });
  };

  const deleteProject = (clientId, projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = clients.map(client =>
        client.id === clientId ? { ...client, projects: client.projects.filter(p => p.id !== projectId) } : client
      );
      setClients(updated);
      saveData(updated);
    }
  };

  const updateProjectStatus = (clientId, projectId, newStatus) => {
    const updated = clients.map(client =>
      client.id === clientId ? { ...client, projects: client.projects.map(p => p.id === projectId ? { ...p, status: newStatus } : p) } : client
    );
    setClients(updated);
    saveData(updated);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 Subh Stories Client Manager</h1>
        <p className="subtitle">Professional Video Editing Business Management</p>
      </header>

      <div className="main-content">
        <div className="toolbar">
          <button
            className="btn-primary"
            onClick={() => {
              setShowAddClient(!showAddClient);
              setEditingClient(null);
              setNewClient({ name: '', email: '', phone: '', address: '' });
            }}
          >
            {showAddClient ? 'Cancel' : '➕ Add New Client'}
          </button>
          <div className="stats">
            <span className="stat-item">📊 {clients.length} Clients</span>
            <span className="stat-item">📁 {clients.reduce((sum, c) => sum + c.projects.length, 0)} Projects</span>
          </div>
        </div>

        {showAddClient && (
          <div className="form-card">
            <h3>{editingClient ? 'Edit Client' : 'Add New Client'}</h3>
            <div className="form-grid">
              <input
                type="text"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                placeholder="Client Name"
                className="input-field"
              />
              <input
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                placeholder="Email"
                className="input-field"
              />
              <input
                type="tel"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                placeholder="Phone"
                className="input-field"
              />
              <input
                type="text"
                value={newClient.address}
                onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                placeholder="Address"
                className="input-field"
              />
            </div>
            <button
              onClick={editingClient ? updateClient : addClient}
              className="btn-success"
            >
              {editingClient ? 'Update Client' : 'Save Client'}
            </button>
          </div>
        )}

        <div className="clients-grid">
          {clients.map(client => (
            <div key={client.id} className="client-card">
              <div className="client-header">
                <h2>{client.name}</h2>
                <div className="client-actions">
                  <button onClick={() => startEditClient(client)} className="btn-edit" title="Edit Client">✏️</button>
                  <button onClick={() => deleteClient(client.id)} className="btn-delete" title="Delete Client">❌</button>
                </div>
              </div>
              <div className="client-info">
                {client.email && <p>✉️ {client.email}</p>}
                {client.phone && <p>📞 {client.phone}</p>}
                {client.address && <p>📍 {client.address}</p>}
              </div>
              <div className="projects-section">
                <div className="section-header">
                  <h3>Projects ({client.projects.length})</h3>
                  <button
                    onClick={() => setShowAddProject({ ...showAddProject, [client.id]: !showAddProject[client.id] })}
                    className="btn-small"
                  >
                    {showAddProject[client.id] ? '✖ Cancel' : '➕ Add Project'}
                  </button>
                </div>

                {showAddProject[client.id] && (
                  <div className="project-form">
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="Project Title"
                      className="input-field"
                    />
                    <textarea
                      value={newProject.details}
                      onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
                      placeholder="Project Details"
                      className="input-field"
                      rows="2"
                    />
                    <input
                      type="date"
                      value={newProject.deliveryDate}
                      onChange={(e) => setNewProject({ ...newProject, deliveryDate: e.target.value })}
                      className="input-field"
                    />
                    <button onClick={() => addProject(client.id)} className="btn-success">Save Project</button>
                  </div>
                )}

                <div className="projects-list">
                  {client.projects.length === 0 ? (
                    <p className="empty-state">No projects yet</p>
                  ) : (
                    client.projects.map(project => (
                      <div key={project.id} className="project-item">
                        <div className="project-content">
                          <h4>{project.title}</h4>
                          {project.details && <p className="project-details">{project.details}</p>}
                          {project.deliveryDate && <p className="delivery-date">📅 {new Date(project.deliveryDate).toLocaleDateString()}</p>}
                          <select
                            value={project.status}
                            onChange={(e) => updateProjectStatus(client.id, project.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                          </select>
                        </div>
                        <button onClick={() => deleteProject(client.id, project.id)} className="btn-delete-small" title="Delete Project">🗑️</button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="empty-state-large">
            <h2>🎉 Welcome to Subh Stories Client Manager!</h2>
            <p>Click "Add New Client" to get started managing your video editing clients and projects.</p>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>© 2025 Subh Stories - Premium Video Editing Services</p>
      </footer>
    </div>
  );
}

export default App;
