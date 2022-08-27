import { ValueTransformer } from "typeorm";
import Password from "../valueObjects/password.value-object";

class PasswordTransformer implements ValueTransformer {
  public from(value: string): Password {
    return new Password(value);
  }

  public to(password: Password): string {
    return password.value;
  }
}

export default PasswordTransformer;
