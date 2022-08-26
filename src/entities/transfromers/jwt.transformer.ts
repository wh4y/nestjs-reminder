import { ValueTransformer } from "typeorm";
import Id from "../valueObjects/id.value-object";
import JWT from "../valueObjects/jwt.value-object";

class JwtTransformer implements ValueTransformer {
  public from(value: string): JWT {
    return new JWT(value);
  }

  public to(token: JWT): string {
    return token.value;
  }
}

export default JwtTransformer;
