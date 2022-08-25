import { ValueTransformer } from "typeorm";
import Username from "../valueObjectEntities/username.entity";

class UsernameTransformer implements ValueTransformer {
  public from(value: string): Username {
    return new Username(value);
  }

  public to(username: Username): string {
    return username.value;
  }
}

export default UsernameTransformer;
