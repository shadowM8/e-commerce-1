function authorization(req,res,next){
    //role check
    if ( req.authenticUser.role === 'admin')
    next()
    else {
        res.status(401).json({
            message : `user not authorized to view this page`
        })
    }
}

module.exports = authorization