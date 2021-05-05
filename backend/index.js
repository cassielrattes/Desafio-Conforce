const app = require("./config");
const http = require("http");
const server = http.createServer(app);

const PORT = process.env.PORT || 38001;

server.listen(PORT, () => {
  console.log("Servidor ligado na porta: " + PORT);
});
