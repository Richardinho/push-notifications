const { publicKey, privateKey } = require('./config');

let express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var db = require('./db.js');
var handleAdminPost = require('./public/admin/handle-admin-post.js');

let app = express();

app.use(express.static('public'))

function saveSubscriptionToDatabase(subscription) {
  db.insert(JSON.stringify(subscription));
  return Promise.resolve('blah');
}

function isValidSaveRequest() {
  return true;
}

app.post('/api/admin', jsonParser, handleAdminPost);

app.post('/api/save-subscription/', jsonParser, function (req, res) {
  if (!isValidSaveRequest(req, res)) {
    return;
  }

  return saveSubscriptionToDatabase(req.body)
  .then(function(subscriptionId) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ data: { success: true } }));
  })
  .catch(function(err) {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      error: {
        id: 'unable-to-save-subscription',
        message: 'The subscription was received but we were unable to save it to our database.'
      }
    }));
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
