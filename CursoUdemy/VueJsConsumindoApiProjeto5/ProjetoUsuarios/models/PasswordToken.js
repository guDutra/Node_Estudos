var knex = require('../database/connection');
var User = require('./User');
class PasswordToken {
    async create(email) {
        try {
            const user = await User.findByEmail(email);
            const token = Date.now();
            if (user != undefined) {
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table('passwordtokens');
                return { status: 200, msg: 'Operação feita com sucesso', token: token };
            } else {
                return { status: 400, err: 'Não existe usuário cadastrado com esse e-mail' };
            }
        } catch (error) {
            console.error(error);
            return { status: 400, err: 'Erro na classe' };
        }
    }

    async validate(token) {
        try {
            const result = await knex.select('*').where({ token: token }).table('passwordtokens');
            if (result.length > 0) {
                const token = result[0];

                if (token.used) {
                    return { status: false };
                } else {
                    return { status: true, token: token };
                }
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }

    }

    async setUsed(token) {
        await knex.update({ used: 1 }).where({ token: token }).table('passwordtokens')
    }
}

module.exports = new PasswordToken();