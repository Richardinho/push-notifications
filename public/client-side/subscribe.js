const publicKey = 'BE23KPVe5Uw2s3BQKh6NnfVzFcx3ISPTEhRqe4Lzbcxr_HTe7sgPRgXJzAK0w7b3WyFisfMfS2t0obITK1Yo7zA';
function createSubscribeOptions() {
  return {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  };
}

function subscribe(registration) {
  const subscribeOptions = createSubscribeOptions();
  // 4. subscribe user with push manager
  return registration.pushManager.subscribe(subscribeOptions);
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
