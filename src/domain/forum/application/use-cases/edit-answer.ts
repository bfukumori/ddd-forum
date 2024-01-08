import { type Answer } from '@domain/forum/enterprise/entities/answer';
import { type AnswersRepository } from '../repositories/answers-repository';
import { right, type Either, left } from '@core/either';
import { NotAllowedError } from './errors/resource-not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditAnswerUseCaseRequest {
  content: string;
  authorId: string;
  answerId: string;
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (answer === null) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    answer.content = content;

    await this.answersRepository.update(answer);

    return right({ answer });
  }
}
