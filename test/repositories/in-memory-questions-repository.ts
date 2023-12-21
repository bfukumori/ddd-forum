import { type QuestionsRepository } from '@domain/forum/application/repositories/questions-repository';
import { type Question } from '@domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (question === null || question === undefined) {
      return null;
    }

    return question;
  }
}
