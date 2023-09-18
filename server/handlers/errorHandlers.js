// * fn représente une méthode de controller
exports.catchErrors = fn => {
    return function (req, res, next) {
        // * qand on appelle next avec un erreur, express lève une erreur et c'est un middleware d'erreur qui prend le relais
        return fn(req, res, next).catch(next);
        // return fn(req, res, next).catch(err => next(err));
    };
};

exports.notFound = (req, res, next) => {
    const err = new Error('Ressource manquante');

    err.status = 404;

    next(err);
};

exports.prodErrors = (err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({ message: err.message });
};

exports.devErrors = (err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({ message: err.message, stack: err.stack });
};
