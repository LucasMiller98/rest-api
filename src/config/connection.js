const mongoose = require('mongoose')

class Connection {
  constructor() {
    this.databaseConnectionMongoDB()
  }

  databaseConnectionMongoDB() {
    this.mongoDBConnection = mongoose.connect('mongodb+srv://LucasMiller98:MillerDo@cluster0.gzc2q.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log('Conexão com o MongoDB estabelecida com sucesso!')
    }).catch((error) => {
      console.error(`Erro na conexão com o banco de dados MongoDB: ${error}`)
    })
  }

}

module.exports = new Connection()