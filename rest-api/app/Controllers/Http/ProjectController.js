'use strict'

const Project = use('App/Models/Project');
const AuthorizationService = use('App/Services/AuthorizationService')

class ProjectController {

    /**
   * Method to get all project by userToken
   * 
   *
   * @method index
   * @param auth
   * @return {Object}
   */
    async index({ auth }){
        const user = await auth.getUser();
        return await user.projects().fetch();
    }

    /**
   * Method to create a project by userToken
   * 
   *
   * @method create
   * @param auth
   * @param request
   * @return {Object}
   */
    async create({ auth, request, response }){
        const user = await auth.getUser();
        const { name } = request.all();
        const project = new Project();
        project.fill({
            name
        });
        await user.projects().save(project);
        return response.status(200).send('Se ha creado un proyecto');
    }

    /**
   * Method to delete a project by userToken and idProject
   * 
   *
   * @method create
   * @param auth
   * @param request
   * @return {Object}
   */
    async destroy({ auth, response, params }){
        const user = await auth.getUser();
        const {id} = params;
        const project = await Project.find(id);
        //This is a service to validate if userId of the project and userId of the auth its the same
        AuthorizationService.verificationPermissions(project,user);
        await project.delete();
        return response.status(200).send('Se ha eliminado un proyecto');
    }

    async update({auth,params,request}){
        const user = await auth.getUser();
        const {id} = params;
        const {name} = request.all(); 
        const project = await Project.find(id);
        //This is a service to validate if userId of the project and userId of the auth its the same
        AuthorizationService.verificationPermissions(project,user);
        project.merge(request.only('name'));
        await project.save();
        return project;
    }
}

module.exports = ProjectController
