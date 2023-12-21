import { Entity } from '@core/entities/entity';
import { type UniqueEntityID } from '@core/entities/unique-entity-id';
import { type Optional } from '@core/types/optional';

interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
export class Answer extends Entity<AnswerProps> {
  get content(): string {
    return this._props.content;
  }

  set content(content: string) {
    this._props.content = content;
    this.touch();
  }

  get authorId(): UniqueEntityID {
    return this._props.authorId;
  }

  get questionId(): UniqueEntityID {
    return this._props.questionId;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._props.updatedAt;
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trimEnd().concat('...');
  }

  private touch(): void {
    this._props.updatedAt = new Date();
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID
  ): Answer {
    const answer = new Answer({ ...props, createdAt: new Date() }, id);

    return answer;
  }
}
