const rp = require('request-promise-native')

module.exports = {
  async index() {
    const google = await rp('http://www.google.com');
  }
}