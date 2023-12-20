import { randomUUID } from 'node:crypto';

export class UniqueEntityID {
  #value: string;

  constructor(value?: string) {
    this.#value = value ?? randomUUID();
  }

  toString() {
    return this.#value;
  }

  toValue() {
    return this.#value;
  }
}
