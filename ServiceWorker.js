let cacheName = "secret-thingy";

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.'); 
  evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
  if(evt.request.url.endsWith("thingthatdoesntexist")) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
  }
  else {
    evt.respondWith(fetch(evt.request));
  }
});

function precache() {
  return caches.open(cacheName).then(function (cache) {
    return cache.addAll([
      'blahblah.jpg',
    ]);
  });
}

async function fromCache(request) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match('blahblah.jpg').then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
// self.addEventListener('fetch', function(event) {
//   if (/\.jpg$/.test(event.request.url)) {
//     event.respondWith(
//       fetch('//www.medium.co.uk/images/itachi.jpg', {
//         mode: 'no-cors'
//       })
//     );
//   }
// });

self.addEventListener('message', function(e) {
  console.log('worker received a message');
  var data = e.data;
  switch (data.cmd) {
    case 'beAnnoying':
      let result = beAnnoying();
      self.postMessage(result);
      break;
    default:
      self.postMessage('Unknown command');
  }
}, false);

function beAnnoying() {
  console.log('called beAnnoying');
  let sum = 0;
  for(let i = 0; i < 1000000000; i++) {
    sum += i;
    // for(let j = 0; j < 999999999; j++) { 
    //   for(let k = 0; k < 999999999; k++) {
        // console.log('I'
        //  + ' am ' 
        //  + ' being ' 
        //  + ' vvvv ' + 
        //  'annoying'
        //  );
      // }
    // }
  }
  return 'done being annoying (the answer was ' + sum + ')';
}