import { type Question } from '@domain/forum/enterprise/entities/question';
import { type QuestionsRepository } from '../repositories/questions-repository';

interface EditQuestionUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
  questionId: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (question === null) {
      throw new Error('Question not found.');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.update(question);

    return { question };
  }
}
