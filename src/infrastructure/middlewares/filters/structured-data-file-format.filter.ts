import { BadRequestException } from "@nestjs/common";

export const structuredDatesFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(new BadRequestException("Invalid file format"), false);
  }
  return callback(null, true);
};
