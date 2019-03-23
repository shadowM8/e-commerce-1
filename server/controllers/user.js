const User = require('../models/User')
const {comparePass, jwtSign} = require('../helpers/util')

module.exports = {
    register: (req, res) => {
        User
            .create({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                fullName: req.body.fullName
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                // console.log(err)
                res.status(500).json(err)
            })
    },
    login: (req, res) => {
        User
            .findOne({ email: req.body.email })
            .then(user => {
                if(!user) res.status(400).json({message:`invalid username/password`})
                else {
                    if(!comparePass(req.body.password, user.password)) res.status(400).json({message:`invalid username/password`})
                    else {
                        let encryptData = {
                            id : user._id,
                            role : user.role,
                            email : user.email
                        }
                        let token = jwtSign(encryptData)
                        res.status(200).json({access_token: token})
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}