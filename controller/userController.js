var user = require('../schemas/user');
var SHA3 = require("crypto-js/sha3");
var boom = require('boom');

exports.createUser = {
    auth: {
      mode:'try',
      strategy:'session'
    },
    handler: function(request, reply) {
      console.log(request.payload);
       var newUser = new user({
         username : request.payload.username,
         password : SHA3(request.payload.password),
         nombre : request.payload.nombre,
         correo : request.payload.correo,
         sitrabaja :request.payload.sitrabaja,
         scope : request.payload.scope
       });
       newUser.save(function (err) {
         console.log(err);
         if(err){
          return reply(boom.notAcceptable('Username must be unique: ' + err));
         }else{
           return reply('ok');
         };
      });
    }
  };

  exports.getUsers = {
  auth: {
    mode:'required',
    strategy:'session'
  },
  handler: function(request, reply){
    var users = user.find({});
    reply(users);
  }
};

exports.getUser = {
  auth: {
    mode:'required',
    strategy:'session'
  },
  handler: function(request, reply){
    var users = user.find({_id:request.params.userId});
    reply(users);
  }
};

  exports.deleteUser = {
      auth: {
        mode:'required',
        strategy:'session'
      },
      handler: function(request, reply){
        var filterBy = request.params.userId;
          user.findOneAndUpdate(
            { _id: filterBy },
            {
              estado : false
            }, function (err, users){
              users.save(function(err){
                return reply('ok');
                console.log('user deleted');
              });
            });
        }
      }
