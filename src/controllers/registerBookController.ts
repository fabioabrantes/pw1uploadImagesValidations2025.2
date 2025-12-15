import type { Request, Response } from "express";

import registerBookUseCase from "../domain/Book/usecases/registerBook.ts";
import type { BookEntity } from "../domain/Book/entity/Book.ts";

import { validateZodBook } from "../services/zodValidations.ts";

import { AppErrosCustom } from "../errors/errorsAplications.ts";
import { AppErrorsZod } from "../errors/errorsZod.ts";

type ParamsType = {
  id: string;
};

class RegisterUserController {
  async handle(request: Request, response: Response) {
    const { ISBN, title, author, description } = request.body as Omit<
      BookEntity,
      "id"
    >;
    const { id } = request.params as ParamsType;

    const files = request.files as Express.Multer.File[] | undefined;
    // validando arquivos
    if (!files) {
      throw new AppErrosCustom("arquivos não existe", 400);
    }
    const nameImages = files.map((file) => ({
      pictureName: file.filename,
    }));

    //validação de formatação dos dados
    const book = {
      author,
      title,
      description,
      userIdFK: id,
      ISBN,
      images: nameImages,
    };
    const resultValidation = validateZodBook(book);
    if (resultValidation) {
      throw new AppErrorsZod(resultValidation.fieldErrors, 400);
    }

    /*  if (nameImages.length === 0) {
      throw new AppErrosCustom(
        "Pelo menos uma imagem do livro é obrigatória",
        400
      );
    } */

    const result = await registerBookUseCase.execute({
      ISBN,
      title,
      author,
      description,
      userIdFK: id,
      images: nameImages,
    });
    response.status(result.status).json(result.body);
    return;
  }
}

export default new RegisterUserController();
