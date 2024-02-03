import { HttpException, Injectable } from "@nestjs/common";
import { LoggerService } from "@unistory/nestjs-logger";

import * as fs from "fs";
import fetch from "cross-fetch";

import { ProjectConfigService } from "src/infrastructure/config/config.service";

@Injectable()
export class FileService {
  constructor(private readonly _logger: LoggerService, private readonly _configService: ProjectConfigService) {}

  public async downloadAndReWriteFile(url: string, filePath: string): Promise<void> {
    try {
      const response = await fetch(url, { method: "GET" });
      console.log("response", response);

      const arrayBuffer = await response.arrayBuffer();
      console.log("arrayBuffer", arrayBuffer);

      const buffer = Buffer.from(arrayBuffer);
      console.log("buffer", buffer);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      fs.writeFile(filePath, buffer, () => {});
    } catch (error) {
      console.log("error", error);
      this._logger.error("cant't download file", error);
      throw new HttpException("cant't download file", 500);
    }
  }
}
