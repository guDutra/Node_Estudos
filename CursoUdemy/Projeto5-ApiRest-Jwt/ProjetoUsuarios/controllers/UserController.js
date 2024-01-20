var User = require('../models/User');
class UserController {
    async create(req, res) {
        try {
            var { name, email, password } = req.body;
            if (email == undefined) {
                res.status(400);
                res.json({ err: "Requisição invalida" })
                return;
            }
            
            const emailExist =  await User.findEmail(email);
            if(emailExist) {
                res.status(406);
                res.send({err: "Esse e-mail já possuí um cadastro"});
                return
            }
           
            await User.new(email, name, password);
            
            res.status(200);
            res.send("Pegando a requisição");
            return;
        } catch (error) {
            console.error("Error in UserController create:", error);
            res.status(500);
            res.json({ error: "Error inserting user" });
        }
    }
}

module.exports = new UserController();