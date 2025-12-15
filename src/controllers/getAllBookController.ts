import type { Request, Response } from "express";

import getAllBooksUseCase from "../domain/Book/usecases/getAllBooks.ts";

type ParamsType = {
  id: string;
};

class GetAllBooksController {
  async handle(request: Request, response: Response) {
    const { id } = request.params as ParamsType;
    const result = await getAllBooksUseCase.execute(id);
    response.status(result.status).json(result.body);
  }
}

export default new GetAllBooksController();
