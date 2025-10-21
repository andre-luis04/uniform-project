import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import path from "path";
import fs from "fs";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: any = {
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      message:
        exception instanceof HttpException
          ? ((exception.getResponse() as any)?.["message"] ?? exception.message)
          : "internal server error",
    };
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const errorLog = {
        timeStamp: new Date().toISOString(),
        method: request.method,
        path: request.url,
        status,
        message: (exception as any)?.["message"],
        stack: (exception as any)?.["stack"],
      };
      this.writeErrorLog(errorLog);
      console.log(errorLog)
    }
    response.status(status).json(responseBody);
  }
  private writeErrorLog(log: any) {
    try {
      const logPath = path.join(__dirname, "..", "logs", "errors.json");
      const logLine = JSON.stringify(log);
      fs.mkdirSync(path.dirname(logPath), { recursive: true });
      fs.appendFileSync(logPath, logLine + "\n", { encoding: "utf8" });
    } catch (err) {
      this.logger.error("falha ao escrever log de erro ", err as any);
    }
  }
}
