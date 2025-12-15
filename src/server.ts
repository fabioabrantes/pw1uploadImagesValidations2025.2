import express from "express";
import { routes } from "./routes/index.ts";
import { tratadorErros } from "./middlewares/tratadorErros.ts";

const server = express();
server.use(express.json());

server.use(routes);
server.use(tratadorErros);

// deixo o server online no ip:localhost e porta:3333
server.listen(3333, () => {
  console.log("o server esta online na porta 3333");
});
