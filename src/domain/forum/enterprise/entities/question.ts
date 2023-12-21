import { Entity } from '@core/entities/entity';
import { Slug } from './value-objects/slug';
import { type UniqueEntityID } from '@core/entities/unique-entity-id';
import { type Optional } from '@core/types/optional';
import dayjs from 'dayjs';

export interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}
export class Question extends Entity<QuestionProps> {
  get content(): string {
    return this._props.content;
  }

  set content(content: string) {
    this._props.content = content;
    this.touch();
  }

  get title(): string {
    return this._props.title;
  }

  set title(title: string) {
    this._props.title = title;
    this._props.slug = Slug.createFromText(title);
    this.touch();
  }

  get slug(): Slug {
    return this._props.slug;
  }

  get authorId(): UniqueEntityID {
    return this._props.authorId;
  }

  get bestAnswerId(): UniqueEntityID | undefined {
    return this._props.bestAnswerId;
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this._props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3;
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trimEnd().concat('...');
  }

  private touch(): void {
    this._props.updatedAt = new Date();
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID
  ): Question {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
      },
      id
    );

    return question;
  }
}
