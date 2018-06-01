const xml2js = require('xml2js')
      parseString = xml2js.parseString,
      builder = new xml2js.Builder({ renderOpts: { pretty: false } })
      fs = require('fs'),
      authenticate = require('./authentication.js').authenticate,
      googleTranslate = require('./google-translate.js'),
      p = require('./utils.js').p,
      async = require('async')

let contents = fs.readFileSync('./English/english.xml', 'utf8')

function translate(token, content, done) {
  googleTranslate(token, content, (err, translated) => {
    if (err) {
      console.err(err)
      if (err.error && err.error.code === 401) {
        return translate(authenticate(), contents, done)
      }
      return done(content)
    }

    if (!translated) {
      return done(content)
    }

    done(translated)
  })
}

// TODO make this read the last non emtpy line of translated-sentences.json
// and set the hash you find there as START_FROM
// or set START_FROM to 'now' if no lines or no file
let START_FROM = 'hdca2574cg0f57g46d1g84f7g4041a2515c98'
fs.writeFileSync('translated-sentences.json', '[]', 'utf8')

parseString(contents, (err, contents) => {
  let translatedSentences = {}
  async.eachSeries(contents.contentList.content, (content, next) => {
    if (content.$.contentuid === START_FROM) {
      console.log('restarting from last') 
      START_FROM = 'now'
      next()
    } else if (START_FROM === 'now') {
      translate(authenticate(), content._, (translated) => {
        console.log(`${content.$.contentuid}: ${translated}`)
        translatedSentences[content.$.contentuid] = translated
        if (Object.keys(translatedSentences).length === 10) {
          let finalContents = require('translated-sentences.json')
          Object.keys(translatedSentences).forEach(key => {
            let obj = {}
            obj[key] = translatedSentences[key]
            finalContents.push(obj) 
          })

          fs.appendFileSync('translated-sentences.json', JSON.stringify(finalContents, null, '  '), 'utf8')
          translatedSentences = {}
        }
        next()
      })
    } else {
      console.log('seeking last translation')
      setImmediate(next)
    }
  })
})
