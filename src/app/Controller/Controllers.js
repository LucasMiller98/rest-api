const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const yup = require('yup')

class Controllers {

  show(require, response) {
    let users = ["Lucas", "Miller", "Santos"]
    return response.status(200).json({
      error: false,
      users
    })
  }

  // para inserir um dado no banco de dados
  async store(req, res, next) {

    /**
     * Validação com YUP schema inicio
     */
    
    let schemaValidation = yup.object().shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
      password: yup.string().required()
    }) 

    const isValidQuestion = (await schemaValidation.isValid(req.body))

    if(!isValidQuestion) {
      res.status(400).json({
        error: true,
        message: 'Dados inválidos'
      })
    }

    /**
     * Validação com YUP schema fim
    */
    
    // verificação no bando de dados se o usuario existe
    
    let hasExistUser = await User.findOne({ email: req.body.email })

    if(hasExistUser) return res.status(400).json({
      error: true,
      message: 'Este usuário já existe'
    })
    
    const { name, email, password } = req.body

    const data = {
      name,
      email, 
      password
    }

    data.password = await bcrypt.hash(data.password, 8) // gera uma criptografia da senha, gera uma hash com 8 caracteres
    
    await User.create(data, (error) => {
      if(error) return res.status(400).json({
          error: true,
          message: 'Error ao tentar inserir usuário no bando no mongodb'
        })

        return res.status(200).json({
          error: false, 
          message: 'Usuário cadastrado com sucesso'
        })
    }) // inseriar data no mongoBD
  }
}

module.exports = new Controllers()