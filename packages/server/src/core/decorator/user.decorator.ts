import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * 1.前端请求携带token
 * 2.通过jwt中间件解密拿到uid,放到requset中。
 * 3.这块做了一个封装，后面使用时直接在方法中@uid() uid:string 就可以拿到uid ,不用@request() request.uid
 */
export const Phone = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.phone;
});
