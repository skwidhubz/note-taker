const express = require('express');
const path = require('path');
const fs = require('fs');
// const api = require('./index');
const PORT = 3001;

const app = express();

const crypto = require('crypto');

uuidGen = function generateUUID() {
  const array = crypto.randomBytes(16);
  
  // Set version (4) and variant (10b) bits
  array[6] = (array[6] & 0x0f) | 0x40;
  array[8] = (array[8] & 0x3f) | 0x80;
  
  let uuid = '';
  for (let i = 0; i < array.length; i++) {
    const octet = array[i].toString(16).padStart(2, '0');
    uuid += (i === 4 || i === 6 || i === 8 || i === 10) ? `-${octet}` : octet;
  }
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
   
  fs.appendFile('.db/db.json', `${req.body}`, (err) =>
  // TODO: Describe how this ternary operator works
  err ? console.error(err) : console.log('Commit logged!')
  ) //work out how to append an object into an array on db json
});



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);