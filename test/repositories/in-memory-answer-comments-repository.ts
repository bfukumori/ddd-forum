import { type PaginationParams } from '@core/repositories/pagination-params';
import { type AnswerCommentsRepository } from '@domain/forum/application/repositories/answer-comments-repository';
import { type AnswerComment } from '@domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if (answerComment === null || answerComment === undefined) {
      return null;
    }

    return answerComment;
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }

  async delete(id: string): Promise<void> {
    const answerCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === id
    );

    this.items.splice(answerCommentIndex, 1);
  }
}
