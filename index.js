const express = require('express');
const logger = require('morgan');

const google = require('googleapis');
const books = google.books('v1');



///////////////////////////////////////////////////
// Initializing the App
const app = express();
app.use(logger('dev'));


// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


///////////////////////////////////////////////////////////////
// Routes
app.get('/', (req, res)=>{
  res.json({"state": "Welcome to Google Search server"});
});

app.get('/search/:title', (req, res)=> {
  let bookTitle = req.params.title
  let startIndex = req.query.start
  let maxResults = req.query.max
  console.log(startIndex)
  books.volumes.list({
    q: bookTitle,
    startIndex,
    maxResults
    }, (err, result) => {
      if (err) {
        res.json(err)
      } else {
        res.json(result)
      }
  });
})

app.get('/books/:bookId', (req, res)=> {
  let bookId = req.params.bookId
  books.volumes.get({volumeId: bookId}, function (err, result) {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  });
})


///////////////////////////////////////////////////////////////
// Starting the server
app.listen(3030, ()=>{
  console.log("Server is running at http://127.0.0.1:3030")
})
