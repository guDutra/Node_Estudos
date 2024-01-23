var jwt = require('jsonwebtoken');
var env = require('dotenv');
var secret = process.env.SECRET;
module.exports = function adminAuth(req, res, next) {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        const token = bearer[1];
        try {
            const decoded = jwt.verify(token, secret);
            console.log(decoded);
            if (decoded.role == 1) {
                next();
            } else {
                res.status(403);
                res.send('Você não possuí nível para autorização essa página');
                return;
            }

        } catch (error) {
            console.error(error)
            res.status(406);
            res.send('Você não está autenticado');
            return;
        }

        return;
    } else {
        res.status(406);
        res.send('Você não está autenticado');
    }

}