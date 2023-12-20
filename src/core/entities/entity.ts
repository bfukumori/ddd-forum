import { randomUUID } from 'node:crypto';

export class Entity<Props> {
  #id: string;
  _props: Props;

  constructor(props: Props, id?: string) {
    this.#id = id ?? randomUUID();
    this._props = props;
  }

  get id(): string {
    return this.#id;
  }
}
