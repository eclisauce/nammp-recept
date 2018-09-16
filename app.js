const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'www');

// Tell the web server to serve files
app.use(express.static('www'));

/**
 * Serves index.html on all routes
 * @author Martin
 */
app.use('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


// Start the web server on port 3000
app.listen(3000, () => console.log('Listening on port 3000'));