import { type QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<void> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (questionComment === null) {
      throw new Error('Question comment not found.');
    }

    if (questionComment._props.authorId.toString() !== authorId) {
      throw new Error('Not allowed');
    }

    await this.questionCommentsRepository.delete(questionComment.id.toString());
  }
}
