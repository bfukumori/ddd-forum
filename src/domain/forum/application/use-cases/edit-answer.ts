import { type Answer } from '@domain/forum/enterprise/entities/answer';
import { type AnswersRepository } from '../repositories/answers-repository';
import { right, type Either, left } from '@core/either';
import { NotAllowedError } from '@core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@core/errors/resource-not-found-error';
import { type AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository';
import { AnswerAttachmentList } from '@domain/forum/enterprise/entities/answer-attachment-list';
import { AnswerAttachment } from '@domain/forum/enterprise/entities/answer-attachment';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

interface EditAnswerUseCaseRequest {
  content: string;
  authorId: string;
  answerId: string;
  attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async execute({
    answerId,
    authorId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (answer === null) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments
    );

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      });
    });

    answerAttachmentList.update(answerAttachments);

    answer.content = content;

    await this.answersRepository.update(answer);

    return right({ answer });
  }
}
