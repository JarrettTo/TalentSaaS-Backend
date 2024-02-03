import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentManager = createParamDecorator((data: string, context: ExecutionContext) => {
  const { manager } = context.switchToHttp().getRequest();
  return data ? manager?.[data] : manager;
});
