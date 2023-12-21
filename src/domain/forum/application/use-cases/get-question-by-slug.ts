import { type Question } from '@domain/forum/enterprise/entities/question';
import { type QuestionsRepository } from '../repositories/questions-repository';

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question;
}

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (question === null) {
      throw new Error('Question not found.');
    }

    return { question };
  }
}
