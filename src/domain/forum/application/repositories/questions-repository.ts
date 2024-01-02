import { type Question } from '@domain/forum/enterprise/entities/question';

export interface QuestionsRepository {
  findBySlug: (slug: string) => Promise<Question | null>;
  findById: (id: string) => Promise<Question | null>;
  create: (question: Question) => Promise<void>;
  delete: (questionId: string) => Promise<void>;
  update: (question: Question) => Promise<void>;
}
