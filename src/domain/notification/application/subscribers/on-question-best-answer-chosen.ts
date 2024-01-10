import { DomainEvents } from '@core/events/domain-events';
import { type EventHandler } from '@core/events/event-handler';
import { type SendNotificationUseCase } from '../use-cases/send-notification';
import { type AnswersRepository } from '@domain/forum/application/repositories/answers-repository';
import { QuestionBestAnswerChosenEvent } from '@domain/forum/enterprise/events/question-best-answer-chosen-event';

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly sendNotificationUseCase: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this.onQuestionBestAnswerChosenNotification.bind(this),
      QuestionBestAnswerChosenEvent.name
    );
  }

  private async onQuestionBestAnswerChosenNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent): Promise<void> {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString()
    );

    if (answer !== null) {
      await this.sendNotificationUseCase.execute({
        recipientId: answer?.authorId.toString(),
        title: 'Sua resposta foi escolhida',
        content: `A resposta que você enviou em "${question.title
          .substring(0, 20)
          .concat('...')}" foi escolhida pelo autor!`,
      });
    }
  }
}
