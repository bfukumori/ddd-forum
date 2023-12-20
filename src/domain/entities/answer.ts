import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
export class Answer extends Entity<AnswerProps> {
  get content(): string {
    return this._props.content;
  }
}
