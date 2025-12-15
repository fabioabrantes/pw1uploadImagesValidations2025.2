import crypto from "node:crypto";
import multer from "multer";
import { resolve } from "node:path";
import type { Request } from "express";
import type { FileFilterCallback } from "multer";

import { AppErrosCustom } from "../errors/errorsAplications.ts";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const filename = `${fileHash}-${file.originalname}`;

          return callback(null, filename);
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
      ) => {
        const allowed = ["image/jpeg", "image/png", "image/webp"];
        if (!allowed.includes(file.mimetype)) {
          cb(new AppErrosCustom("Tipo de arquivo inválido", 400));
          return;
        }
        cb(null, true);
      },
    };
  },
};
