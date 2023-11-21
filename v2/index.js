const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Explicitly set Content-Type for app.js
app.use('/app.js', express.static(path.join(__dirname, 'app.js'), { 'Content-Type': 'application/javascript' }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
