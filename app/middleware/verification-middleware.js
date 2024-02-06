

const checkIfNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
const checkIfAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.redirect('/account/login')
    }
    next()
}


module.exports.checkAuthenticated = checkIfAuthenticated
module.exports.checkIfNotAuthenticated = checkIfNotAuthenticated