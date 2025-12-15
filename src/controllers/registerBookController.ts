import type { Request, Response } from "express";

import registerBookUseCase from "../domain/Book/usecases/registerBook.ts";
import type { BookEntity } from "../domain/Book/entity/Book.ts";

type ParamsType = {
  id: string;
};

class RegisterUserController {
  async handle(request: Request, response: Response) {
    const { ISBN, title, author, description } = request.body as Omit<
      BookEntity,
      "id"
    >;
    const files = request.files as Express.Multer.File[];
    const pictureName = files.map((file) => ({
      pictureName: file.filename,
    }));
    const { id } = request.params as ParamsType;

    //validação de formatação dos dados

    const result = await registerBookUseCase.execute({
      ISBN,
      title,
      author,
      description,
      userIdFK: id,
      images: pictureName,
    });
    response.status(result.status).json(result.body);
    return;
  }
}

export default new RegisterUserController();
