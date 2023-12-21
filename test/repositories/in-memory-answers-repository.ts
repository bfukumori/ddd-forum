import { type AnswersRepository } from '@domain/forum/application/repositories/answers-repository';
import { type Answer } from '@domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = [];

  async create(answers: Answer): Promise<void> {
    this.answers.push(answers);
  }
}
