const User = require('../models/User')

module.exports = {
    register : (req,res) => {
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
                    res.status(500).json({message:`server error nih`, err})
                })
    }
}