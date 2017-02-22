var promisifiedCrypto = require('./index')
var promisifiedCrypto = promisifiedCrypto
promisifiedCrypto.getCrypto().then((crypto)=>{
    console.log("crypto is available")
}).catch((err)=>{
    console.log("crypto is unavailable")
})

promisifiedCrypto.getEncryptedData("hello world","anw123","hex").then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})
