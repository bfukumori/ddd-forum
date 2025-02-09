import { DomainEvents } from '@core/events/domain-events';
import { type EventHandler } from '@core/events/event-handler';
import { type QuestionsRepository } from '@domain/forum/application/repositories/questions-repository';
import { AnswerCreatedEvent } from '@domain/forum/enterprise/events/answer-created-event';
import { type SendNotificationUseCase } from '../use-cases/send-notification';

export class OnAnswerCreated implements EventHandler {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly sendNotificationUseCase: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async sendNewAnswerNotification({
    answer,
  }: AnswerCreatedEvent): Promise<void> {
    const question = await this.questionsRepository.findById(
      answer.authorId.toString()
    );

    if (question !== null) {
      await this.sendNotificationUseCase.execute({
        recipientId: question?.authorId.toString(),
        title: `Nova resposta em "${question.title
          .substring(0, 40)
          .concat('...')}"`,
        content: answer.excerpt,
      });
    }
  }
}
