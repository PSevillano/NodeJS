'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidAcceException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle (error, {response}) {
     return response.status(403).send({message: "Invalid Access"});
   }
}

module.exports = InvalidAcceException
