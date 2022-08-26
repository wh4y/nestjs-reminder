import * as Joi from 'joi';

class Id {
  public readonly value: string;

  constructor(value: string) {
    Joi.assert(value, Joi.string().uuid().required());
    this.value = value;
  }
}

export default Id;
