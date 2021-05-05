const { uuid } = require("uuidv4");

class Ingredientes {
  constructor({ ingrediente, valor }) {
    this.id = uuid();
    this.ingrediente = ingrediente;
    this.valor = valor;
  }
}

module.exports = Ingredientes;
