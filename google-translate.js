const request = require('request')

module.exports = (token, text, done) => {
  request.post({
    headers: { Authorization: `Bearer ${token}` },
    uri: 'https://translation.googleapis.com/language/translate/v2',
    json: { 
      q: text,
      source: 'en',
      target: 'it',
      format: 'text'
    }
  }, function (err, res, body) {
    if (err) {
      return done(err)
    }
    if (!body.data) {
      return done()
    }

    return done(null, body.data.translations[0].translatedText)
  })
}