const { uuid } = require("uuidv4");

class Ingredientes {
  constructor({ lanche, ingredientes }) {
    this.id = uuid();
    this.lanche = lanche;
    this.ingredientes = ingredientes;
  }
}

module.exports = Ingredientes;
