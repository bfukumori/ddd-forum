import { randomUUID } from 'node:crypto';

export class Answer {
  constructor(public content: string, public id?: string) {
    this.id = id ?? randomUUID();
  }
}
