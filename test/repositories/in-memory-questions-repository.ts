import { type QuestionsRepository } from '@domain/forum/application/repositories/questions-repository';
import { type Question } from '@domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (question === null || question === undefined) {
      return null;
    }

    return question;
  }

  async findById(questionId: string): Promise<Question | null> {
    const question = this.items.find(
      (item) => item.id.toString() === questionId
    );

    if (question === null || question === undefined) {
      return null;
    }

    return question;
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async delete(questionId: string): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toString() === questionId
    );

    this.items.splice(questionIndex, 1);
  }

  async update(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id
    );

    this.items[questionIndex] = question;
  }
}
