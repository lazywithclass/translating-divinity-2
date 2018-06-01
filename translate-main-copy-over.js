const xml2js = require('xml2js')
      parseString = xml2js.parseString,
      builder = new xml2js.Builder({ renderOpts: { pretty: true } })
      fs = require('fs'),
      async = require('async'),
      p = require('./utils.js').p

let contents = fs.readFileSync('./English/english.xml', 'utf8')
let translated = require('./translated.json')

const contentuid = o => Object.keys(o)[0]

parseString(contents, (err, contents) => {
  async.eachSeries(contents.contentList.content, (content, next) => {
    let found = translated.find(t => contentuid(t) === content.$.contentuid)
    if (!found) {
      console.log(content.$.contentuid)
      return setImmediate(next)
    }
    content._ = found[contentuid(found)]
    setImmediate(next)
  }, () => fs.writeFileSync(`./Italian/italian.xml`, builder.buildObject(contents)))
})
