import { Claim } from "./Claim";
import { ClaimTypes } from "./ClaimTypes";
import { MatchClaim } from "./types";

export class ClaimsIdentity {
  private _claims: Claim[] = [];
  nameClaimType: string = ClaimTypes.Name;
  rolesClaimType: string = ClaimTypes.Roles;
  issuer = "LOCAL AUTHORITY";

  constructor(claims?: Claim | Claim[]) {
    if (claims) {
      Array.isArray(claims) ? this._claims.push(...claims) : this._claims.push(claims);
    }
  }

  public get claims(): ReadonlyArray<Claim> {
    return this._claims;
  }

  public get name(): string | null {
    return this.claims.find((x) => x.type === this.nameClaimType)?.value ?? null;
  }

  public addClaim(claim: Claim): void {
    this._claims.push(claim);
  }

  public addClaims(claims: Claim[]): void {
    this._claims.push(...claims);
  }

  public get roles(): string[] {
    return this.claims.filter((x) => x.type === this.rolesClaimType).map((x) => x.value);
  }

  public hasClaim(typeOrMatch: string | MatchClaim, value?: string) {
    const match = this.normalizeTypeOrMatch(typeOrMatch);
    for (const claim of this.claims) {
      if (match(claim) && (!value || claim.value === value)) {
        return true;
      }
    }
    return false;
  }

  public findFirst(typeOrMatch: string | MatchClaim): Claim | null {
    const match = this.normalizeTypeOrMatch(typeOrMatch);
    for (const claim of this.claims) {
      if (match(claim)) {
        return claim;
      }
    }
    return null;
  }

  public findAll(typeOrMatch: string | MatchClaim): Claim[] {
    const result: Claim[] = [];
    const match = this.normalizeTypeOrMatch(typeOrMatch);
    for (const claim of this.claims) {
      if (match(claim)) {
        result.push(claim);
      }
    }
    return result;
  }

  private normalizeTypeOrMatch(typeOrMatch: string | MatchClaim): MatchClaim {
    let matchNormalized: (claim: Claim) => boolean;
    typeof typeOrMatch === "function"
      ? (matchNormalized = typeOrMatch)
      : (matchNormalized = (claim) => claim.type.toUpperCase() === typeOrMatch.toUpperCase());
    return matchNormalized;
  }
}
