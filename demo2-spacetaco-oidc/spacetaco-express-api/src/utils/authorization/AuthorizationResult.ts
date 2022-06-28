export class AuthorizationResult {
  private _succeeded: boolean;
  private _failure?: string;
  public get succeeded(): boolean {
    return this._succeeded;
  }
  public get failure(): string | null {
    return this._failure ?? null;
  }
  public static success(): AuthorizationResult {
    const result = new AuthorizationResult();
    result._succeeded = true;
    return result;
  }
  public static failed(failureReason: string) {
    const result = new AuthorizationResult();
    result._failure = failureReason;
    return result;
  }
  public static combine(results: AuthorizationResult[]): AuthorizationResult {
    const result = new AuthorizationResult();
    result._succeeded = results.every((x) => x.succeeded);
    if (!result.succeeded) {
      result._failure = results
        .filter((x) => !!x.failure)
        .map((x) => x.failure)
        .join(", ");
    }
    return result;
  }
}
