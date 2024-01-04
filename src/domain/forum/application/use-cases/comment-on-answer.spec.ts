import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { makeAnswer } from 'test/factories/make-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it('should be able to comment on a answer', async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comment on answer',
    });
    expect(inMemoryAnswerCommentsRepository.items[0]._props.content).toEqual(
      'Comment on answer'
    );
  });
});
