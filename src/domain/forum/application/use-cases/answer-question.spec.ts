import { type Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswerQuestionUseCase } from './answer-question';
import { type AnswersRepository } from '@domain/forum/application/repositories/answers-repository';

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer): Promise<void> => {},
};

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);
  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  });

  expect(answer.content).toEqual('Nova resposta');
});
