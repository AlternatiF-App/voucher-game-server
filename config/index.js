// const dotenv = require('dotenv');
// dotenv.config()

// module.exports = {
//     // serviceName : process.env.SERVICE_NAME,
//     urlDb : process.env.MONGO_URL.toString()
// }
const path = require('path')

module.exports={
    rootPath : path.resolve(__dirname, '..'),
    MONGO_URL:"mongodb+srv://fanani:sTJwzCGdiHAdbSNI@cluster0.jgw1f.mongodb.net/test?retryWrites=true&w=majority"
}