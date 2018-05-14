const xml2js = require('xml2js')
      parseString = xml2js.parseString,
      builder = new xml2js.Builder({ renderOpts: { pretty: false } })
      fs = require('fs'),
      authenticate = require('./authentication.js').authenticate,
      googleTranslate = require('./google-translate.js'),
      p = require('./utils.js').p

let contents = fs.readFileSync('./English/english.xml', 'utf8')

function translate(err, contents, done) {
  if (err) return console.err(err)

  const results = []

  function loop(index, token) {
    if (!contents.contentList.content[index]) return done(results)

    console.log(`doing ${index}`)
    googleTranslate(token, contents.contentList.content[index]._, (err, translated) => {
      if (err) {
        if (err.error && err.error.code === 401) {
          return loop(index, authenticate())
        }
        return loop(index + 1, token)
      }

      if (!translated) {
        return loop(index + 1, token)
      }

      results.push({
        _: translated,
        $: contents.contentList.content[index].$
      })
      if (index == contents.contentList.content.length - 1) return done(results)
      loop(index + 1, token)
    })
  }

  loop(0, authenticate())
}

parseString(contents, (err, contents) => translate(err, contents, (results) => {
  const toXML = { contentList: {} }
  toXML.contentList.content = results
  fs.writeFileSync('Italian/italian.xml', builder.buildObject(toXML))
}))
