import { ClaimsIdentity } from "./ClaimsIdentity";
import { Claim } from "./Claim";
import { MatchClaim } from "./types";
import {ClaimTypes} from "./ClaimTypes";

export class ClaimsPrincipal {
  private _identities: ClaimsIdentity[] = [];

  constructor(identity?: ClaimsIdentity) {
    if (identity) {
      this._identities.push(identity);
    }
  }
  public get userId(): string | null {
    return this.findFirst(ClaimTypes.Subject)?.value ?? null;
  }
  public get identities(): ReadonlyArray<ClaimsIdentity> {
    return this._identities;
  }
  public get claims(): ReadonlyArray<Claim> {
    return this._identities.flatMap((x) => x.claims);
  }
  public addIdentity(identity: ClaimsIdentity): void {
    this._identities.push(identity);
  }
  public isInRole(role: string): boolean {
    for (let i = 0; i < this._identities.length; i++) {
      if (this._identities[i].hasClaim(this._identities[i].rolesClaimType, role)) {
        return true;
      }
    }
    return false;
  }

  public hasClaim(match: string | MatchClaim, value?: string): boolean {
    for (const identity of this._identities) {
      const identityHasClaim = identity.hasClaim(match, value);
      if (identityHasClaim) {
        return true;
      }
    }
    return false;
  }

  public findFirst(match: string | MatchClaim): Claim | null {
    let result: Claim | null = null;
    for (const identity of this._identities) {
      result = identity.findFirst(match);
      if (result !== null) {
        return result;
      }
    }
    return result;
  }

  findAll(match: string | MatchClaim): Claim[] {
    const result: Claim[] = [];
    for (const identity of this._identities) {
      const matches = identity.findAll(match);
      if (matches.length > 0) {
        result.push(...matches);
      }
    }
    return result;
  }
}
