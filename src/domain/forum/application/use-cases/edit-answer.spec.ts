import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { EditAnswerUseCase } from './edit-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { NotAllowedError } from '@core/errors/not-allowed-error';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: EditAnswerUseCase;

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository
    );
  });

  it('should be able to edit an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    );

    await inMemoryAnswersRepository.create(newAnswer);

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      })
    );

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: newAnswer.authorId.toValue(),
      content: 'content-1',
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'content-1',
    });
  });

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1')
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
      content: 'content-1',
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
