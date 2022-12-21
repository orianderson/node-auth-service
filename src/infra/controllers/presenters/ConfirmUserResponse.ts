export class ConfirmUserResponse {
  static toHttpResponse(user: { id: string }) {
    return {
      userId: user.id,
    };
  }
}
