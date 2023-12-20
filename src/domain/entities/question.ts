import { randomUUID } from 'node:crypto';
import { Slug } from './value-objects/slug';

export class Question {
  constructor(
    public title: string,
    public slug: Slug,
    public content: string,
    public authorId: string,
    public id?: string
  ) {
    this.id = id ?? randomUUID();
  }
}
