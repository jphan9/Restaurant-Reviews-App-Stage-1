if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js', { scope: './' })
    .then(function(registration) {
      console.log('It Registered', registration);
    })
    .catch(function(error) {
      console.log("It failed to register", error);
    })
}
