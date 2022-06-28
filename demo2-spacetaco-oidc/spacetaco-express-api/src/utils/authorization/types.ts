export const AuthorizationRequirements = {
    Scopes: "scopes",
};
const reqArray = [AuthorizationRequirements.Scopes] as const;
export type AuthorizationRequirements = typeof reqArray[number];
export type AuthorizationOptions = Partial<Record<AuthorizationRequirements, string | string[]>>;
