import { type AnswersRepository } from '@domain/forum/application/repositories/answers-repository';
import { type Answer } from '@domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === answerId);

    if (answer === null || answer === undefined) {
      return null;
    }

    return answer;
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }

  async delete(answerId: string): Promise<void> {
    const answerIndex = this.items.findIndex(
      (item) => item.id.toString() === answerId
    );

    this.items.splice(answerIndex, 1);
  }

  async update(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items[answerIndex] = answer;
  }
}
