import { ValueTransformer } from "typeorm";
import Id from "../valueObjects/id.value-object";
import JWT from "../valueObjects/jwt.value-object";

class JwtTransformer implements ValueTransformer {
  public from(value: string | null): JWT | null {
    return value ? new JWT(value) : null;
  }

  public to(token: JWT | null): string {
    return token ? token.value : null;
  }
}

export default JwtTransformer;
