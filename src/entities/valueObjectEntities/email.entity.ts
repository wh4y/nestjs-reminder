import * as Joi from 'joi';

class Email {
  public readonly value: string;

  constructor(value: string) {
    Joi.assert(value, Joi.string().email().required());
    this.value = value;
  }
}

export default Email;
