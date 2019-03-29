const browser = window.chrome || window.browser

console.log(`Running background script`)
browser.webRequest.onHeadersReceived.addListener(e => {
  console.log(`Added CORS headers`)
  addCORS(e.responseHeaders, '*', e, true)
  return { responseHeaders: e.responseHeaders }
},
{
  urls: ['https://js-assets.aiv-cdn.net/playback/web_player/ATVWebPlayer/*/ATVWebPlayer.js']
}, ['blocking', 'responseHeaders'])

browser.webRequest.onBeforeRequest.addListener((e) => {
  console.log(`Redirected request to local ATVWebPlayer.js`)
  return { redirectUrl: browser.extension.getURL('ATVWebPlayer.js') }
},
{
  urls: ['https://js-assets.aiv-cdn.net/playback/web_player/ATVWebPlayer/*/ATVWebPlayer.js'],
  types: ['script']
}, ['blocking'])
