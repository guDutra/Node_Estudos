var User = require('../models/User');
var PasswordToken = require('../models/PasswordToken');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var env = require('dotenv');
env.config();
var secret = process.env.SECRET;


class UserController {

    async index(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
        }
    }
    async findUser(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            if (user == undefined) {
                res.status(404);
                res.send({ err: 'Não foi encontrado usuário com id passado' })
            } else {
                res.json(user);
            }

        } catch (error) {
            console.error(error);
        }
    }
    async create(req, res) {
        try {
            var { name, email, password } = req.body;
            if (email == undefined) {
                res.status(400);
                res.json({ err: "Requisição invalida" })
                return;
            }
            const emailExist = await User.findEmail(email);
            if (emailExist) {
                res.status(406);
                res.send({ err: "Esse e-mail já possuí um cadastro" });
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

    async edit(req, res) {
        try {
            var { id, email, name, role } = req.body;
            const result = await User.update(id, email, name, role);

            if (result != undefined) {
                if (result.status == 200) {
                    res.send({ msg: "Usuário atualizado com sucesso" })
                } else {

                    res.status(result.status);
                    res.send({ err: result.err });
                }
            } else {

                res.status(result.status);
                res.send({ err: result.err });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const result = await User.delete(id);
            if (result.status == 200) {
                res.send({ msg: result.msg });
            } else {
                res.status(result.status);
                res.send({ err: result.err });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async recoverPassword(req, res) {

        try {
            const email = req.body.email;
            const result = await PasswordToken.create(email);
            if (result.status == 200) {
                res.send({ msg: result.msg });
            } else {
                res.status(result.status);
                res.send({ err: result.err })
            }
        } catch (error) {
            console.error(error);
            res.status(500);
            res.send({ err: 'Erro no metódo em controller' });
        }
    }

    async changePassword(req, res) {
        try {
            var token = req.body.token;
            var password = req.body.password;

            const validToken = await PasswordToken.validate(token);
            if (validToken.status) {
                const result = await User.changePassword(password, validToken.token.user_id, validToken.token.token);
                if (result.status == 200) {
                    res.send("Senha alterada");
                } else {
                    res.status(result.status);
                    res.send({ err: result.err });
                }

            } else {
                res.status(401);
                res.send({ msg: 'Token invalido!' });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async login(req, res) {
        try {
            var {email, password} = req.body;
            const user = await User.findByEmail(email);
            if(user != undefined) {
                const result = await bcrypt.compare(password,user.password);
                if(result) {
                    const token = jwt.sign({email: user.email, role: user.role}, secret);
                    res.json({token: token});
                } else {
                    res.status(406);
                    res.send('Senha incorreta!');
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new UserController();