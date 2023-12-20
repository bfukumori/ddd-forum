import { UniqueEntityID } from './unique-entity-id';

export class Entity<Props> {
  #id: UniqueEntityID;
  _props: Props;

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.#id = id ?? new UniqueEntityID(id);
    this._props = props;
  }

  get id(): UniqueEntityID {
    return this.#id;
  }
}
