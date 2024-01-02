import { type AnswersRepository } from '../repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const question = await this.answersRepository.findById(answerId);

    if (question === null) {
      throw new Error('Answer not found.');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    await this.answersRepository.delete(answerId);
  }
}
