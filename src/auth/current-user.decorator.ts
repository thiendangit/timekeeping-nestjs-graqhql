import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  console.log(context);
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});

// export const CurrentUser = createParamDecorator((data, [root, args, ctx, info]) => ctx.req.user);
