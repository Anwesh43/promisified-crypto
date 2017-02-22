var cryptoObj = {}
var q = require('q')
cryptoObj.getCrypto = () => {
  var defer = q.defer()
  try {
      var crypto = require('crypto')
      defer.resolve(crypto)
  }
  catch(err) {
      console.log(err)
      defer.reject(err)
  }
  return defer.promise
}
