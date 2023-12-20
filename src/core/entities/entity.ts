import { UniqueEntityID } from './unique-entity-id';

export class Entity<Props> {
  #id: UniqueEntityID;
  _props: Props;

  constructor(props: Props, id?: string) {
    this.#id = new UniqueEntityID(id);
    this._props = props;
  }

  get id(): UniqueEntityID {
    return this.#id;
  }
}
