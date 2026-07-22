export interface JwtPayload {
  sub: string; // user id
  email: string;
  phone: string;
  roles: string[];
  iat?: number;
  exp?: number;
}
