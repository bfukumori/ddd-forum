import { type Either, right, left } from '@core/either';
import { type QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { ResourceNotFoundError } from '@core/errors/resource-not-found-error';
import { NotAllowedError } from '@core/errors/not-allowed-error';

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (questionComment === null) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment._props.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment.id.toString());
    return right(null);
  }
}
