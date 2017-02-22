var promisifiedCryptoObj = {}
promisifiedCryptoObj.crypto = require('./get_crypto')
module.exports = promisifiedCryptoObj
