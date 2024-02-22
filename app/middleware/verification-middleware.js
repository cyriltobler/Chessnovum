// check if user is not logged in
const checkIfNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
};

// check if user is logged in
const checkIfAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }
    return next();
};

module.exports.checkIfAuthenticated = checkIfAuthenticated;
module.exports.checkIfNotAuthenticated = checkIfNotAuthenticated;
