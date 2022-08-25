import User from "./user.entity";
import Id from "./valueObjectEntities/id.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import IdTransformer from "./transfromers/id.transformer";

export interface CreateContactOptions {
  id: Id;
  type: string;
  value: string;
  user: User;
}

@Entity("contact")
class Contact {

  @Column({
    type: "uuid",
    primary: true,
    unique: true,
    transformer: new IdTransformer()
  })
  public readonly id: Id;

  @Column({
    type: "varchar"
  })
  public readonly type: string;

  @Column({
    type: "varchar"
  })
  public readonly value: string;

  @ManyToOne(() => User, (user) => user.events)
  public readonly user: User;

  public static createInstance(options: CreateContactOptions) {
    const plain = { ...options };
    Reflect.setPrototypeOf(plain, User.prototype);

    return plain as Contact;
  }

  public withValue(value: string) {
    return Contact.createInstance({ ...this, value }) as Contact;
  }
}

export default Contact;
