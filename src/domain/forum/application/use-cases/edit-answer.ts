import { type AnswersRepository } from '../repositories/answers-repository';

interface EditAnswerUseCaseRequest {
  content: string;
  authorId: string;
  answerId: string;
}

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answersRepository.findById(answerId);

    if (answer === null) {
      throw new Error('Answer not found.');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    answer.content = content;

    await this.answersRepository.update(answer);
  }
}
