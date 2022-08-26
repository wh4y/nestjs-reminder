import { ValueTransformer } from "typeorm";
import Id from "../valueObjects/id.value-object";

class IdTransformer implements ValueTransformer {
  public from(value: string): Id {
    return new Id(value);
  }

  public to(id: Id): string {
    return id ? id.value : undefined;
  }
}

export default IdTransformer;
