const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers for different pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/skills', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'skills.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📱 Visit: http://localhost:${PORT}`);
  console.log(`🔗 Test these URLs:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/about`);
  console.log(`   - http://localhost:${PORT}/skills`);
  console.log(`   - http://localhost:${PORT}/projects`);
  console.log(`   - http://localhost:${PORT}/contact`);
});
