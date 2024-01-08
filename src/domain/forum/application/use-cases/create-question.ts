import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Question } from '@domain/forum/enterprise/entities/question';
import { type QuestionsRepository } from '../repositories/questions-repository';
import { right, type Either } from '@core/either';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      content,
      authorId: new UniqueEntityID(authorId),
      title,
    });

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
