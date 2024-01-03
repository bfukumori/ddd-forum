import { type AnswersRepository } from '@domain/forum/application/repositories/answers-repository';
import { type Question } from '@domain/forum/enterprise/entities/question';
import { type QuestionsRepository } from '../repositories/questions-repository';

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (answer === null) {
      throw new Error('Answer not found.');
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (question === null) {
      throw new Error('Question not found.');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed');
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return { question };
  }
}
