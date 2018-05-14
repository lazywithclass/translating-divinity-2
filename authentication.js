const { execSync } = require('child_process');

module.exports.authenticate = () => 
  execSync('gcloud auth print-access-token')
    .toString('utf8')
    .replace('\n', '')
