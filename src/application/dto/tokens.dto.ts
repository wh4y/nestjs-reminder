import JWT from "../../domain/entities/user/valueObjects/jwt.value-object";

export class TokensDto {
  accessToken: JWT;
  refreshToken: JWT;
}
