var trabajo = require('../schemas/trabajo');
var SHA3 = require("crypto-js/sha3");
var boom = require('boom');

exports.createTrabajo = {
  auth: {
    mode:'try',
    strategy:'session',
    scope: 'admin'
  },
  handler: function(request, reply) {
    console.log(request.payload);
     var newTrabajo = new trabajo({
       titulo: request.payload.titulo,
       descripcion: request.payload.descripcion,
       cargo: request.payload.cargo,
       contacto: request.payload.contacto,
       salario: request.payload.salario
     });
     newTrabajo.save();
     console.log('trabajo agregado');
     return reply('ok');
  }
};

exports.deleteTrabajo = {
  auth: {
    mode : 'required',
    strategy : 'session',
    scope: 'admin'
  },
  handler: function(request, reply){
    var filterBy = request.params.userId;
      trabajo.findOneAndUpdate(
        { _id: filterBy },
        {
          estado : false
        }, function (err, regalos){
          trabajo.save(function(err){
            return reply('ok');
            console.log('regalo deleted');
          });
        });
  }
}

exports.updateTrabajo = {
  auth :{
    mode : 'requiered',
    strategy: 'session',
    scope: 'admin'
  },
  handler: function(request, reply){
    var filterBy = request.params.userId,
    var newtitulo = request.payload.titulo,
    var newdescripcion = request.payload.descripcion,
    var newcargo = request.payload.cargo,
    var newcontacto = request.payload.contacto,
    var newsalario = request.payload.salario,
    var newstatus = request.payload.status

    trabajo.findOneAndUpdate(
      { _id: filterBy },
      {
        titulo = newtitulo;
        descripcion = newdescripcion,
        cargo = newcargo,
        contacto = newcontacto,
        salario = newsalario,
        status = newstatus

      }, function (err, trabajos){
        trabajo.save(function(err){

        });
      });

      console.log('trabajo updated');

      return reply('ok');
  }
}

exports.getTrabajos = {
  auth: {
    mode:'required',
    strategy:'session'
  },
  handler: function(request, reply){
    var trabajos = trabajo.find({});
    reply(trabajos);
  }
}

exports.getTrabajo = {
  auth: {
    mode:'required',
    strategy:'session'
  },
  handler: function(request, reply){
    var trabajos = trabajo.find({_id:request.params.userId});
    reply(trabajos);
  }
}
