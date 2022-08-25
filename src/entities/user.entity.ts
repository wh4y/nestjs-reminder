import Id from "./valueObjectEntities/id.entity";
import Email from "./valueObjectEntities/email.entity";
import Username from "./valueObjectEntities/username.entity";
import Password from "./valueObjectEntities/password.entity";
import Contact from "./contact.entity";
import Event from "./event.entity";
import { Column, Entity, OneToMany } from "typeorm";
import IdTransformer from "./transfromers/id.transformer";
import EmailTransformer from "./transfromers/email.transformer";
import PasswordTransformer from "./transfromers/password.transformer";
import UsernameTransformer from "./transfromers/username.transformer";

export interface CreateUserOptions {
  id: Id;
  email: Email;
  username: Username;
  password: Password;
  contacts: Contact[];
  events: Event[];
}

@Entity("user")
class User {

  @Column({
    type: "uuid",
    primary: true,
    unique: true,
    transformer: new IdTransformer()
  })
  public readonly id: Id;

  @Column({
    type: "varchar",
    unique: true,
    transformer: new EmailTransformer()
  })
  public readonly email: Email;

  @Column({
    type: "varchar",
    transformer: new UsernameTransformer()
  })
  public readonly username: Username;

  @Column({
    type: "varchar",
    transformer: new PasswordTransformer()
  })
  public readonly password: Password;

  @OneToMany(() => Contact, (contact) => contact.user)
  public readonly contacts: Contact[];

  @OneToMany(() => Event, (event) => event.user)
  public readonly events: Event[];

  public static createInstance(options: CreateUserOptions) {
    const plain = { ...options };
    Reflect.setPrototypeOf(plain, User.prototype);

    return plain as User;
  }

  public withEmail(value: Email) {
    return User.createInstance({ ...this, email: value }) as User;
  }

  public withUsername(value: Username) {
    return User.createInstance({ ...this, username: value }) as User;
  }

  public withContacts(value: Contact[]) {
    return User.createInstance({ ...this, contacts: value }) as User;
  }

  public withEvents(value: Event[]) {
    return User.createInstance({ ...this, events: value }) as User;
  }
}

export default User;
