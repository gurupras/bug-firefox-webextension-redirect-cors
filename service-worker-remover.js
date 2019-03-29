/* global twosevenExtLog */

;(() => {
  const domains = [
    new RegExp('https://www.amazon.*')
  ]

  const { location: { href } } = window
  setInterval(() => {
    if (domains.some(domain => domain.test(href))) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        if (registrations.length > 0) {
          for (let registration of registrations) {
            registration.unregister()
          }
          twosevenExtLog('unregistered all service workers')
        }
      })
    }
  }, 1000)
})()
