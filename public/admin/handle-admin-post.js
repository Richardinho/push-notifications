const webpush = require('web-push');
const { getSubscriptionsFromDatabase } = require('../../db');
const { publicKey, privateKey } = require('../../config');

webpush.setVapidDetails(
  'mailto:richard@richardhunter.co.uk',
  publicKey,
  privateKey
);

function deleteSubscriptionFromDatabase() {
  //  todo
}

function postMessageToSubscribers(message) {
  return Promise.resolve();
}


function triggerPushMsg(subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend)
  .catch((err) => {
    if (err.statusCode === 410) {
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      console.log('Subscription is no longer valid: ', err);
    }
  });
}

function handler(req, res) {
  const dataToSend = req.body.data;

  getSubscriptionsFromDatabase()
    .then((subscriptions) => {
      let promiseChain = Promise.resolve();

      for (let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i];
        console.log(JSON.parse(subscription.jdoc));
        promiseChain = promiseChain.then(() => {
          let sub = subscription.jdoc;
          if (sub) {
            return triggerPushMsg(JSON.parse(sub), dataToSend);
          } else {
            return Promise.resolve();
          }
        });
      }

      return promiseChain;
    })
    .then(() => {
      const jsonString = JSON.stringify({ data: 'success!'})
      res.send(jsonString);
    });
}

module.exports = handler;

