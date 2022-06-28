import { MiddlewareMethods } from "@tsed/platform-middlewares";
import { Context } from "@tsed/platform-params";
import { Next } from "@tsed/common";

export abstract class MiddlewareBase implements MiddlewareMethods {
  use(@Context() ctx: Context, @Next() next: Next): void {
    this.invoke(ctx, next);
  }

  abstract invoke(ctx: Context, next: Next): void;
}
