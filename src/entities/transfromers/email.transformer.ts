import { ValueTransformer } from "typeorm";
import Email from "../valueObjectEntities/email.entity";

class EmailTransformer implements ValueTransformer {
  public from(value: string): Email {
    return new Email(value);
  }

  public to(email: Email): string {
    return email.value;
  }
}

export default EmailTransformer;
