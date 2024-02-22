const checkIfNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
};

const checkIfAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }
    return next();
};

module.exports.checkIfAuthenticated = checkIfAuthenticated;
module.exports.checkIfNotAuthenticated = checkIfNotAuthenticated;
