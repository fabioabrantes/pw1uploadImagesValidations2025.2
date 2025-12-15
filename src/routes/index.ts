import { Router } from "express";
import multer from "multer";
import registerUserController from "../controllers/registerUserController.ts";
import GetUserAllController from "../controllers/getUserAllController.ts";
import GetUserByIdController from "../controllers/getUserByIdController.ts";
import UpdateUserController from "../controllers/updateUserController.ts";
import DeleteUserController from "../controllers/deleteUserController.ts";

import uploadConfig from "../config/upload.ts";
// controllers da entidade livro
import registerBookController from "../controllers/registerBookController.ts";
import getAllBookController from "../controllers/getAllBookController.ts";

// autenticação controller
import authenticateController from "../controllers/authenticateController.ts";

//middleware de verificação de token
import { verifyToken } from "../middlewares/verifyToken.ts";

const routes = Router();
const upload = multer(uploadConfig.upload("./images"))
// rotas usuarios
routes.get("/users", verifyToken, GetUserAllController.handle);
routes.get("/users/:id", verifyToken, GetUserByIdController.handle);

routes.put("/users/:id", verifyToken, UpdateUserController.handle);
routes.delete("/users/:id", verifyToken, DeleteUserController.handle);

routes.post("/users", registerUserController.handle);

// rotas dos livros
routes.post("/users/:id/books", verifyToken,upload.array("pictureName"), registerBookController.handle);
routes.get("/users/:id/books", verifyToken, getAllBookController.handle);

//rota autenticação
routes.post("/login", authenticateController.handle);

export { routes };
