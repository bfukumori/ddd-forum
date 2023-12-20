import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Optional } from '@core/types/optional';

interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
export class Answer extends Entity<AnswerProps> {
  get content() {
    return this._props.content;
  }

  get authorId() {
    return this._props.authorId;
  }

  get questionId() {
    return this._props.questionId;
  }

  get createdAt() {
    return this._props.createdAt;
  }

  get updatedAt() {
    return this._props.updatedAt;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...');
  }

  private touch() {
    this._props.updatedAt = new Date();
  }

  set content(content: string) {
    this._props.content = content;
    this.touch();
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const answer = new Answer({ ...props, createdAt: new Date() }, id);

    return answer;
  }
}
