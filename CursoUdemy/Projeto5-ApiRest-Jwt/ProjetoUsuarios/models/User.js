const knex = require("../database/connection");
var bcrypt = require('bcrypt');
class User {
    async new(email, name, password) {
        try {
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({ email,name: name, password: hash, role: 0 }).into('users');
        } catch (error) {
            console.error(error);
        }
    }

    async findEmail(email) {
        try {

            var result = await knex.select("*").from('users').where({email: email});
            if(result.length > 0) {
                return true;
            } else {
                return false;
            }
        }catch(error) {
            console.error(error);
            return false;
        }
    }
}
module.exports = new User();