import Email from "./valueObjects/email.value-object";
import Username from "./valueObjects/username.value-object";
import Contact from "../contact/contact.entity";
import Event from "../event/event.entity";
import { Column, Entity, OneToMany } from "typeorm";
import EmailTransformer from "./transformers/email.transformer";
import UsernameTransformer from "./transformers/username.transformer";
import JWT from "./valueObjects/jwt.value-object";
import JwtTransformer from "./transformers/jwt.transformer";
import { Exclude, Transform } from "class-transformer";

export interface CreateUserOptions {
  email: Email;
  username: Username;
  password: string;
  contacts: Contact[];
  events: Event[];
  accessToken: JWT | null;
  refreshToken: JWT | null;
}

export interface Tokens {
  accessToken: JWT;
  refreshToken: JWT;
}

@Entity("user")
class User {

  @Column({
    type: "uuid",
    primary: true,
    unique: true,
    generated: "uuid"
  })
  public readonly id: string;

  @Column({
    type: "varchar",
    unique: true,
    transformer: new EmailTransformer()
  })
  @Transform(({ value }) => value.value)
  public readonly email: Email;

  @Column({
    type: "varchar",
    transformer: new UsernameTransformer()
  })
  @Transform(({ value }) => value.value)
  public readonly username: Username;

  @Column({
    type: "varchar"
  })
  @Exclude()
  public readonly password: string;

  @OneToMany(() => Contact, (contact) => contact.user)
  public readonly contacts: Contact[];

  @OneToMany(() => Event, (event) => event.user)
  public readonly events: Event[];

  @Column({
    type: "varchar",
    nullable: true,
    transformer: new JwtTransformer()
  })
  @Transform(({ value }) => value.value)
  public readonly accessToken: JWT;

  @Column({
    type: "varchar",
    nullable: true,
    transformer: new JwtTransformer()
  })
  @Transform(({ value }) => value.value)
  public readonly refreshToken: JWT;

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

  public withTokens(tokens: Tokens) {
    return User.createInstance({
      ...this,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  }
}

export default User;
