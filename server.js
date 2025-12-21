const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the current directory
app.use(express.static(__dirname));

// Define routes for all pages
const pages = [
  'index',
  'about',
  'education',
  'skills',
  'projects',
  'certificates',
  'contact',
  'matrix-operations'
];

// Create routes for all pages
pages.forEach(page => {
  app.get(`/${page === 'index' ? '' : page}`, (req, res) => {
    const filePath = path.join(__dirname, `${page === 'index' ? 'index' : page}.html`);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(`Error serving ${page}.html:`, err);
        res.status(404).sendFile(path.join(__dirname, 'index.html'));
      }
    });
  });
});

// Handle direct file access with .html extension
app.get('/:page', (req, res) => {
  const page = req.params.page;
  if (page.endsWith('.html') && pages.includes(page.replace('.html', ''))) {
    res.sendFile(path.join(__dirname, page));
  } else {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
  }
});

// Handle 404 errors - redirect to home page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to view your portfolio`);
});