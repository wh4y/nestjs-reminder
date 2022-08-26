import User from "./user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import uuid from "uuid";

export interface CreateEventOptions {
  title: string;
  date: Date;
  description: string;
  user: User;
}

@Entity("event")
class Event {

  @Column({
    type: "uuid",
    primary: true,
    unique: true,
  })
  public readonly id: string;

  @Column({
    type: "varchar"
  })
  public readonly title: string;

  @Column({
    type: "timestamp"
  })
  public readonly date: Date;

  @Column({
    type: "varchar"
  })
  public readonly description: string;

  @ManyToOne(() => User, (user) => user.events)
  public readonly user: User;

  public static createInstance(options: CreateEventOptions) {
    const plain = { ...options, id: uuid.v4() };
    Reflect.setPrototypeOf(plain, User.prototype);

    return plain as Event;
  }

  public withTitle(value: string): Event {
    return Event.createInstance({ ...this, title: value }) as Event;
  }

  public withDate(value: Date) {
    return Event.createInstance({ ...this, date: value }) as Event;
  }

  public withDescription(value: string) {
    return Event.createInstance({ ...this, description: value }) as Event;
  }
}

export default Event;
