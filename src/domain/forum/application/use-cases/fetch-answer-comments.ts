import { type AnswerComment } from '@domain/forum/enterprise/entities/answer-comment';
import { type AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { right, type Either } from '@core/either';

interface FetchAnswerCommentsUseCaseRequest {
  page: number;
  answerId: string;
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[];
  }
>;

export class FetchAnswerCommentsUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return right({ answerComments });
  }
}
