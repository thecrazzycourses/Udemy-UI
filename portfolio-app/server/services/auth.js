const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

exports.checkJWT = jwt({

    secret: jwksRsa.expressJwtSecret({
        cache: true, // Default Value
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: 'https://oauth-dev.auth0.com/.well-known/jwks.json'
    }),

    audience: 'RVsirzWXK2TNsuoI6G3w3kawFs5xHKir',
    issuer: 'https://oauth-dev.auth0.com/',
    algorithms: ['RS256']
})

exports.checkRole = role => (req, res, next) => {
    const user = req.user;

    if (user && user['http://localhost:3000/role'] === role) {
        next();
    } else {
        return res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access!!'});
    }
}
