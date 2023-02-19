const express = require('express');
const path = require('path');
const fs = require('fs');
// const api = require('./index');
const PORT = 3001;

const app = express();

const crypto = require('crypto');

uuidGen = function generateUUID() {
  const uuid = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return uuid;
}

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);

// GET route serve notes page
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public/notes.html'),
console.log('notes page sent'))
);

// POST route for saving note to server
app.post('/api/notes', (req, res) => {
  var noteNote = req.body;
  noteNote.id = uuidGen(); //ID to equal the position in array // adding ID to each note
  console.log(req.body) 

  fs.readFile('./db/db.json', (err, cb) => {
    var dataCurrent = JSON.parse(cb);
    dataCurrent.push(noteNote);
    fs.writeFile('./db/db.json', `${JSON.stringify(dataCurrent, null, 4)}`, (err) =>
    err ? console.error(err) : console.log('Commit logged!')
  )})
  
});

// GET notes db listed on page.
app.get('/api/notes', (req, res) => {
  res.sendFile('./db/db.json'),
  console.log('database sent')
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);