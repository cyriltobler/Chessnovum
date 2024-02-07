const checkIfNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

const checkIfAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }
    next();
}


module.exports.checkIfAuthenticated = checkIfAuthenticated;
module.exports.checkIfNotAuthenticated = checkIfNotAuthenticated;