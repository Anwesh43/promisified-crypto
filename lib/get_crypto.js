var cryptoObj = {}
var q = require('q')
cryptoObj.getCrypto = function() {
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
    this.getCrypto().then(function(crypto){
        var cipher = crypto.createCipher('aes192',password)
        var encrypted = ""
        cipher.on('readable',function(){
            var msg = cipher.read()
            if((format == "hex" || format == "base64" || format == "latin1") && msg!=undefined) {
                encrypted += msg.toString(format)
            }

        })
        cipher.on('end',function(){
            defer.resolve(encrypted)
        })
        cipher.write(data,'utf-8')
        cipher.end()
    }).catch((err)=>{
        defer.reject(err)
    })
    return defer.promise
}
cryptoObj.getDecryptedData = function(data,password,format) {
    var defer = q.defer()
    this.getCrypto().then(function(crypto){
        var decipher = crypto.createDecipher('aes192',password)
        var decrypted = ""
        decipher.on('readable',function(){
            var msg = decipher.read()
            if(msg != undefined) {
                decrypted+=msg.toString('utf-8')
            }
        })
        decipher.on('end',function(){
            defer.resolve(decrypted)
        })
        if((format == "hex" || format == "base64" || format == "latin1")) {
            decipher.write(data,format)
            decipher.end()
        }
    }).catch(function(err){
        defer.reject(err)
    })

    return defer.promise

}
module.exports = cryptoObj
