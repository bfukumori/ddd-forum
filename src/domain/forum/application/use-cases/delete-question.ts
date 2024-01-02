import { type QuestionsRepository } from '../repositories/questions-repository';

interface DeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionsRepository.findById(questionId);

    if (question === null) {
      throw new Error('Question not found.');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    await this.questionsRepository.delete(questionId);
  }
}
