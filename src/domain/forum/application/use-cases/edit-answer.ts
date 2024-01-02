import { type Answer } from '@domain/forum/enterprise/entities/answer';
import { type AnswersRepository } from '../repositories/answers-repository';

interface EditAnswerUseCaseRequest {
  content: string;
  authorId: string;
  answerId: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (answer === null) {
      throw new Error('Answer not found.');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    answer.content = content;

    await this.answersRepository.update(answer);

    return { answer };
  }
}
