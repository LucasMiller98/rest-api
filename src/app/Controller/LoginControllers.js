const User = require('../Models/User')
const bcrypt = require('bcryptjs')  
const jwt = require('jsonwebtoken')
const config = require('../../config/auth')

class LoginController {

  async index(req, res) { // para login
    const { email, password } = req.body

    // Verificando se o usuário existe na aplicação
    const hasUserExistBD =  await User.findOne({ email })

    if(!hasUserExistBD) return res.status().json({
      error: true,
      message: 'Usuário não existe'
    })
    // ----------

    let isPasswordEqual = (await bcrypt.compare(password, hasUserExistBD.password, ))

    if(!isPasswordEqual) return res.status(400).json({
      error: true,
      message: 'A senha está inválida!'
    })

    return res.status(200).json({
      user: {
        name: hasUserExistBD.name,
        email: hasUserExistBD.email
      },
      token: jwt.sign(
        {id: hasUserExistBD._id}, 
        config.secret, 
        {expiresIn: config.expireIn})      
    })
  }
}

module.exports = new LoginController()