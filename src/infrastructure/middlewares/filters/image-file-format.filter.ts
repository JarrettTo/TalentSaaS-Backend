import { BadRequestException } from "@nestjs/common";

export const avatarsFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
    return callback(new BadRequestException("Invalid file format"), false);
  }
  return callback(null, true);
};
