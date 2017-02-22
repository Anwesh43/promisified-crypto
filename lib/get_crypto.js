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
cryptoObj.getEncryptedData = function(data,password,format){
    var defer = q.defer()
    this.getCrypto().then((crypto)=>{
        var cipher = crypto.createCipher('aes192',password)
        var encrypted = ""
        cipher.on('readable',()=>{
            var msg = cipher.read()
            if((format == "hex" || format == "hex" || format == "latin1") && msg!=undefined) {
                encrypted += msg.toString(format)
            }

        })
        cipher.on('end',()=>{
            defer.resolve(encrypted)
        })
        cipher.write(data,'utf-8')
        cipher.end()
    }).catch((err)=>{
        defer.reject(err)
    })
    return defer.promise
}
module.exports = cryptoObj
