import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (data == "userId" && request.user["id"] != null) {
    return request.user["id"];
  }
  if (data) {
    return request.user[data];
  }

  return request.user;
});
