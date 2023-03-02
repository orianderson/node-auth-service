import { UserId } from './../interfaces/UserId';

export abstract class IAuthGuard {
  abstract handleRequest(): UserId;
}
