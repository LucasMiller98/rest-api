const jwt = require('jsonwebtoken')
const config = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization

  if(!auth) return res.status(401).json({
    error: true,
    codo: 130,
    message: 'O token de autorização não existe!'
  })

  const [, token] = auth.split(' ') // separação pelo espaço

  try{
    const decode = await promisify(jwt.verify)(token, config.secret)

    if(!decode) {
      return res.status(401).json({
        error: true,
        code: 130,
        message: 'O token está expirado!'
      })
    }else{
      req.user_id = decode.id
      next()
    }
  }catch {
    return res.status(401).json({
      error: true,
      code: 130,
      message: 'O token está inválido!'
    })
  }

}