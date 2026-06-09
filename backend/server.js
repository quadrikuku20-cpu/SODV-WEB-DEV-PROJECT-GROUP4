const express = require('express');
const cors = require('cors');
const { users, properties, workspaces } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// Test route
app.get('/', (req, res) => {
  res.send('WorkSpace Finder Server is running!');
});

// REGISTER - Save new user
app.post('/register', (req, res) => {
  const { name, phone, email, password, role } = req.body;

  // Check if email already exists
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const newUser = { id: users.length + 1, name, phone, email, password, role };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// LOGIN - Check user credentials
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({ message: 'Login successful', user });
});

// SAVE PROPERTY - linked to owner
app.post('/properties', (req, res) => {
  const { ownerId, address, neighborhood, sqft, garage, transport } = req.body;
  const newProperty = { id: properties.length + 1, ownerId, address, neighborhood, sqft, garage, transport };
  properties.push(newProperty);
  res.status(201).json({ message: 'Property added successfully', property: newProperty });
});

// GET PROPERTIES - by owner
app.get('/properties/:ownerId', (req, res) => {
  const ownerId = parseInt(req.params.ownerId);
  const ownerProperties = properties.filter(p => p.ownerId === ownerId);
  res.json(ownerProperties);
});

// SAVE WORKSPACE - linked to property
app.post('/workspaces', (req, res) => {
  const { propertyId, type, seats, smoking, availability, term, price } = req.body;
  const newWorkspace = { id: workspaces.length + 1, propertyId, type, seats, smoking, availability, term, price };
  workspaces.push(newWorkspace);
  res.status(201).json({ message: 'Workspace added successfully', workspace: newWorkspace });
});

// GET ALL WORKSPACES
app.get('/workspaces', (req, res) => {
  res.json(workspaces);
});
// DELETE PROPERTY
app.delete('/properties/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Property not found' });
  }
  properties.splice(index, 1);
  res.json({ message: 'Property deleted successfully' });
});
// EDIT PROPERTY
app.put('/properties/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Property not found' });
  }
  properties[index] = { ...properties[index], ...req.body };
  res.json({ message: 'Property updated successfully', property: properties[index] });
});

// EDIT WORKSPACE
app.put('/workspaces/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = workspaces.findIndex(w => w.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Workspace not found' });
  }
  workspaces[index] = { ...workspaces[index], ...req.body };
  res.json({ message: 'Workspace updated successfully', workspace: workspaces[index] });
});

// DELETE WORKSPACE
app.delete('/workspaces/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = workspaces.findIndex(w => w.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Workspace not found' });
  }
  workspaces.splice(index, 1);
  res.json({ message: 'Workspace deleted successfully' });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});