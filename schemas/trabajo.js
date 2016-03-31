var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var TrabajoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  cargo: String,
  contacto: String,
  salario: String
  estado: Boolean
});
module.exports = mongoose.model('Trabajo', TrabajoSchema);
