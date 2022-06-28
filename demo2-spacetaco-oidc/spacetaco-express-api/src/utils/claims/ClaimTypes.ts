/**
 * Defines constants for the well-known claim types that can be
 * assigned to a subject.
 */
/**
 * @export
 * @const
 */
export const ClaimTypes = {
    /**
     * Issuer of the JWT
     * @type {string}
     * @memberOf ClaimTypes
     */
    Issuer: "iss",
    /**
     * Subject of the JWT (the user)
     * @type {string}
     * @memberOf ClaimTypes
     */
    Subject: "sub",
    /**
     * Recipient for which the JWT is intended
     * @type {string}
     * @memberOf ClaimTypes
     */
    Audience: "aud",
    /**
     * Time after which the JWT expires
     * @type {string}
     * @memberOf ClaimTypes
     */
    ExpirationTime: "exp",
    /**
     * Time before which the JWT must not be accepted for processing
     * @type {string}
     * @memberOf ClaimTypes
     */
    NotBeforeTime: "nbf",
    /**
     * Time at which the JWT was issued; can be used to determine age of the JWT
     * @type {string}
     * @memberOf ClaimTypes
     */
    IssuedAtTime: "iat",
    /**
     *  Unique identifier; can be used to prevent the JWT from being replayed
     *  (allows a token to be used only once)
     * @type {string}
     * @memberOf ClaimTypes
     */
    JwtId: "jti",
    /**
     *  Full name
     * @type {string}
     * @memberOf ClaimTypes
     */
    Name: "name",
    /**
     *  Roles
     * @type {string}
     * @memberOf ClaimTypes
     */
    Roles: "roles",
    /**
     *  Roles
     * @type {string}
     * @memberOf ClaimTypes
     */
    Scope: "scope",
};
