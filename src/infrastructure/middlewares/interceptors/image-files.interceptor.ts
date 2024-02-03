import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ConfigService } from "@nestjs/config";

import { diskStorage } from "multer";
import { extname } from "path";
import * as uuid from "uuid";

import { ProjectConfigService } from "../../../infrastructure/config/config.service";
import { avatarsFilter } from "../filters/image-file-format.filter";

const configService = new ProjectConfigService(new ConfigService());

const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);

  const guid = uuid.v4();
  const currentDate = new Date().toISOString();

  callback(null, `${guid}-${currentDate}${fileExtName}`);
};

export const ImageFilesInterceptor = (fieldName: MulterField[]) => {
  return FileFieldsInterceptor(fieldName, {
    storage: diskStorage({
      destination: `./public/${configService.avatarFilesPath}`,
      filename: editFileName,
    }),
    fileFilter: avatarsFilter,
  });
};
