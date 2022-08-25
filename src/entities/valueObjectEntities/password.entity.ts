import * as Joi from 'joi';

class Password {
  public readonly value: string;

  constructor(value: string) {
    Joi.assert(value, Joi.string().regex(/^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9\-_]{8,30}$/).required());
    this.value = value;
  }
}

export default Password;
