const xml2js = require('xml2js')
      parseString = xml2js.parseString,
      builder = new xml2js.Builder({ renderOpts: { pretty: false } })
      fs = require('fs'),
      async = require('async'),
      authenticate = require('./authentication.js').authenticate,
      googleTranslate = require('./google-translate.js'),
      p = require('./utils.js').p


const files = fs.readdirSync('./English/Subtitles')
async.eachSeries(files, function(file, callback) {
  console.log(`translating ${file}`)
  let contents = fs.readFileSync(`./English/Subtitles/${file}`, 'utf8')
  parseString(contents, (err, contents) => {
    translate(err, contents, (results) => {
      fs.writeFileSync(`./Italian/Subtitles/${file}`, builder.buildObject(results))
      callback()
    })
  })
})

function translate(err, contents, done) {
  let root = contents.save.region[0].node[0].children[0].node
  let token = authenticate()

  function loop(index) {
    let obj = root[index].children[0].node[0].children[0].node[0].attribute[0].$
    googleTranslate(token, obj.value, (err, translated) => {
      obj.value = translated
      if (index == root.length - 1) return done(contents)
      loop(index + 1)
    })
  }

  loop(0)
}