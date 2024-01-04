import { type AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<void> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (answerComment === null) {
      throw new Error('Answer comment not found.');
    }

    if (answerComment._props.authorId.toString() !== authorId) {
      throw new Error('Not allowed');
    }

    await this.answerCommentsRepository.delete(answerComment.id.toString());
  }
}
