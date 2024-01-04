import { type PaginationParams } from '@core/repositories/pagination-params';
import { type AnswerComment } from '@domain/forum/enterprise/entities/answer-comment';

export interface AnswerCommentsRepository {
  findById: (id: string) => Promise<AnswerComment | null>;
  findManyByAnswerId: (
    answerId: string,
    params: PaginationParams
  ) => Promise<AnswerComment[]>;
  create: (answerComment: AnswerComment) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
