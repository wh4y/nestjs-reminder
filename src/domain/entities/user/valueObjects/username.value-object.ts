import * as Joi from "joi";

class Username {
  public readonly value: string;

  constructor(value: string) {
    Joi.assert(value, Joi.string().min(1).max(25).regex(/^[a-zA-Z0-9\-_]{1,25}$/).required());
    this.value = value;
  }
}

export default Username;
