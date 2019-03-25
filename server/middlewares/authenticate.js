const { jwtVerify } = require('../helpers/util')

function Authenticate(req, res, next) {
    try {
        const decoded = jwtVerify(req.headers.access_token)
        req.authenticUser = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }
        next()
    }
    catch (err) {
        console.log('ini err',err)
        res.status(401).json({ message: 'unauthenticated user' })
    }
}

module.exports = Authenticate