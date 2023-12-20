import { randomUUID } from 'node:crypto';

export class Question {
  constructor(
    public title: string,
    public content: string,
    public authorId: string,
    public id?: string
  ) {
    this.id = id ?? randomUUID();
  }
}
