import { type PaginationParams } from '@core/repositories/pagination-params';
import { type QuestionCommentsRepository } from '@domain/forum/application/repositories/question-comments-repository';
import { type QuestionComment } from '@domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (item) => item.id.toString() === id
    );

    if (questionComment === null || questionComment === undefined) {
      return null;
    }

    return questionComment;
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ): Promise<QuestionComment[]> {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }

  async delete(id: string): Promise<void> {
    const questionCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === id
    );

    this.items.splice(questionCommentIndex, 1);
  }
}
