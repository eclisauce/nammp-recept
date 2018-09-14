const express = require('express');
// Create a new web server
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'www');


require('all-that-sass')({
  watch:  'scss',
  input:  './scss/main.scss',
  output: './www/css/main.css',
  reportErrors: true,
  reportCompiles: true,
  outputStyle: 'compressed'
});

// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));

// Serves index.html on all urls
// app.use('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });


// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));