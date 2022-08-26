import { ValueTransformer } from "typeorm";
import Username from "../valueObjects/username.value-object";

class UsernameTransformer implements ValueTransformer {
  public from(value: string): Username {
    return new Username(value);
  }

  public to(username: Username): string {
    return username.value;
  }
}

export default UsernameTransformer;
