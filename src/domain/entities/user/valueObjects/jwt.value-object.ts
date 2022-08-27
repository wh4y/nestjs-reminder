import * as Joi from "joi";

class JWT {
  public readonly value: string;

  constructor(value: string) {
    Joi.assert(value, Joi.string().required());
    this.value = value;
  }
}

export default JWT;
