
function subscribeUserToPush() {
  //  2. Register service worker
  return navigator.serviceWorker.register('client-side/service-worker.js')
  .then(function(registration) {
    console.log('Service worker successfully registered.');
    return registration;
  })
  .then(subscribe)
  .then(sendSubscriptionToServer)
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}

(function main() {
  //  1. check if browser supports push messaging (and service worker)
  if (!('serviceWorker' in navigator)) { return; }
  if (!('PushManager' in window)) { return; }
  askPermission(subscribeUserToPush);

} ());

