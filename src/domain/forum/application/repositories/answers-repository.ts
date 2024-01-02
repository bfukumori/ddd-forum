import { type Answer } from '@domain/forum/enterprise/entities/answer';

export interface AnswersRepository {
  create: (answer: Answer) => Promise<void>;
  findById: (id: string) => Promise<Answer | null>;
  delete: (answerId: string) => Promise<void>;
  update: (answer: Answer) => Promise<void>;
}
