const knex = require("../database/connection");
var bcrypt = require('bcrypt');
const PasswordToken = require("./PasswordToken");
class User {

    async findAll() {
        try {
            const result = await knex.select(['id', 'email', 'name', 'role']).table('users');
            return result;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async findById(id) {
        try {
            const result = await knex.select(['id', 'email', 'name', 'role']).where({ id: id }).table('users');
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    async findByEmail(email) {
        try {
            const result = await knex.select(['id', 'email', 'name', 'password', 'role']).where({ email: email }).table('users');
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
    async new(email, name, password) {
        try {
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({ email, name: name, password: hash, role: 0 }).into('users');
        } catch (error) {
            console.error(error);
        }
    }

    async findEmail(email) {
        try {

            var result = await knex.select("*").from('users').where({ email: email });
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async update(id, email, name, role) {
        try {
            const user = await this.findById(id);
            if (user != undefined) {
                let editUser = {};
                if (email != undefined) {
                    if (email != user.email) {
                        const result = await this.findEmail(email);
                        if (!result) {
                            editUser.email = email;
                        } else {
                            return { status: 409, err: 'Já possuí um usuario com este e-mail cadastrado' };
                        }
                    }
                }
                if (name != undefined) editUser.name = name;
                if (role != undefined) editUser.role = role;

                await knex.update(editUser).where({ id: id }).table('users');
                return { status: 200 };
            } else {
                return { status: 404, err: 'Usuário não existe!' };
            }
        } catch (error) {
            console.error(error);
        }
    }

    async delete(id) {
        try {
            const user = await this.findById(id);
            if (user == undefined) {
                return { status: 404, err: "Não existe usuário cadastrado com esse id" };
            } else {
                const result = await knex.where({ id: id }).delete().table('users');
                if (result > 0) {
                    return { status: 200, msg: 'Usuário deletado com sucesso' }
                } else {
                    return { status: 500, err: "Erro ao deletar usuário no banco" };
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async changePassword(newPassword, id, token) {
        try {
            const hash = await bcrypt.hash(newPassword, 10);
            await knex.update({ password: hash }).where({ id: id }).table('users');
            await PasswordToken.setUsed(token);
            return { status: 200 };
        } catch (error) {
            console.error(error);
            return { status: 500, err: 'Erro ao mudar senha' };
        }

    }
}
module.exports = new User();