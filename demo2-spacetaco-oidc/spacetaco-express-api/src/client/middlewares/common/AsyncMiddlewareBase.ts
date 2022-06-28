import { MiddlewareMethods } from "@tsed/platform-middlewares";
import { Next } from "@tsed/common";
import { Context } from "@tsed/platform-params";

export abstract class AsyncMiddlewareBase implements MiddlewareMethods {
  async use(@Context() ctx: Context, @Next() next: Next): Promise<void> {
    await this.invokeAsync(ctx, next);
  }
  abstract invokeAsync(ctx: Context, next: Next): Promise<void>;
}
