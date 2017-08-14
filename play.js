var google = require('googleapis');
var books = google.books('v1');

// Documentation https://developers.google.com/apis-explorer/#p/books/v1/

books.volumes.list({q: 'a', maxResults: 40, startIndex: 41}, function (err, response) {
  if (err) {
    console.log('Encountered error', err);
  } else {
    console.log(response.items.length);
  }
});

// get the long url of a shortened url
// books.volumes.get({volumeId: '4pgQfXQvekcC'}, function (err, response) {
//   if (err) {
//     console.log('Encountered error', err);
//   } else {
//     console.log(response);
//   }
// });
