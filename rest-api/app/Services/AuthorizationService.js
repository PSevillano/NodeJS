const InvalidAccess = use('App/Exceptions/InvalidAccessException');
const ResourceNotFound = use('App/Exceptions/ResourceNotFoundException');

class AuthorizationService{
    verificationPermissions(res, user){
        if(!res){
            throw new ResourceNotFound();
        }
        if(res.user_id !== user.id){
            throw new InvalidAccess();
        }
    }
}

module.exports = new AuthorizationService();