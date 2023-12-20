import { Entity } from '@core/entities/entity';
import { Slug } from './value-objects/slug';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Optional } from '@core/types/optional';
import dayjs from 'dayjs';

interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}
export class Question extends Entity<QuestionProps> {
  get content() {
    return this._props.content;
  }

  get title() {
    return this._props.title;
  }

  get slug() {
    return this._props.slug;
  }

  get authorId() {
    return this._props.authorId;
  }

  get bestAnswerId() {
    return this._props.bestAnswerId;
  }

  get createdAt() {
    return this._props.createdAt;
  }

  get updatedAt() {
    return this._props.updatedAt;
  }

  get isNew() {
    return dayjs().diff(this.createdAt, 'days') <= 3;
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

  set title(title: string) {
    this._props.title = title;
    this._props.slug = Slug.createFromText(title);
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this._props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID
  ) {
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
