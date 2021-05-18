'use strict'

const User = use('App/Models/User');


class UserController {
    async store({request,response}){
        const { email, password } = request.all();
        let result;
        try {
            const user = await User.create({
                email,
                password,
                username : email,
            });
            result = response.status(200).send({message:'Has creado un usuario correctamente'});
        } catch (error) {
            result = response.status(403).send({message:'Ha habido un error en la creacion de usuarios'});
        }
        return result
    }

    async login({request,response, auth}){
        const { email, password } = request.all();
        let result;
        try {
            const token = await auth.attempt(email, password );
            result = response.status(200).send(token);
        } catch (error) {
            result = response.status(403).send({message:'Ha habido un error en el login'});
        }
        return result;
    }

    async index() {
        /*const cachedUsers = await Redis.get('users')
        if (cachedUsers) {
            return JSON.parse(cachedUsers)
        }
      
        const users = await Database.table('users').select('*');
        await Redis.set('users', JSON.stringify(users))
        return users*/
    }
}

module.exports = UserController
