function addCORS (headers, value = '*', e = {}, bypassCredentialsCheck = false) { // eslint-disable-line no-unused-vars
  if (e.initiator) {
    const initiatorOrigin = new URL(e.initiator).origin
    const currentCors = getHeaderValue('access-control-allow-origin', headers)
    if (currentCors !== '*' && initiatorOrigin === currentCors) {
      value = initiatorOrigin
    }
  }

  // If you change CORS to '*' without looking at hasCredentials, youtube will stop working
  const hasCredentials = getHeaderValue('access-control-allow-credentials', headers)
  if (!bypassCredentialsCheck && hasCredentials === 'true') {
    return
  }
  addHeaderEntry('Vary', 'Origin', headers)

  const name = 'access-control-allow-origin'
  addHeaderEntry(name, value, headers)
}

function getHeaderEntry (name, headers) {
  var ret
  headers.forEach((entry) => {
    if (!!entry.name && entry.name.toLowerCase() === name.toLowerCase()) {
      ret = entry
    }
  })
  return ret
}

function getHeaderValue (name, headers) { // eslint-disable-line no-unused-vars
  const entry = getHeaderEntry(name, headers)
  if (entry) {
    return entry.value
  }
}

function addHeaderEntry (name, value, headers) {
  const entry = getHeaderEntry(name, headers)
  if (entry) {
    entry.value = value
  } else {
    headers.push({
      name,
      value
    })
  }
}
