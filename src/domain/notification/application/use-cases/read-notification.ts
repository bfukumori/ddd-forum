import { type Either, right, left } from '@core/either';
import { type Notification } from '@domain/notification/enterprise/entities/notification';
import { type NotificationsRepository } from '../repositories/notifications-repository';
import { NotAllowedError } from '@core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@core/errors/resource-not-found-error';

interface ReadNotificationUseCaseRequest {
  notificationId: string;
  recipientId: string;
}

type ReadNotificationUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (notification === null) {
      return left(new ResourceNotFoundError());
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.update(notification);

    return right({ notification });
  }
}
