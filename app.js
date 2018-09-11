const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'www');

// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));

// Serves index.html on all urls
// app.use('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });

app.listen(3000, () => console.log('Listening on port 3000'));