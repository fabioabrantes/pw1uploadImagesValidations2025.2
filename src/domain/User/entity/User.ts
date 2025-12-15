import type { BookEntity } from "../../Book/entity/Book.ts";

export type UserEntity = {
  id:string;
  name:string;
  cpf:string;
  email:string;
  password:string;
  books?:BookEntity[];
}

