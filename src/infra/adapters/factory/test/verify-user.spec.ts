import { UserUsecasesFactory } from "../user-usecases/UserUsecasesFactory";

describe("VerifyUserUsecases Test", () => {
  const verifyUser = new UserUsecasesFactory().isUser();
  it("", async () => {
    const email = {
      email: "ipxec@email.com",
    };
    const isUser = await verifyUser.execute(email);

    if (isUser.isRight()) {
      expect(isUser.value).toBeTruthy();
    }
  });

  it("", async () => {
    const email = {
      email: "and@email.com",
    };
    const isUser = await verifyUser.execute(email);

    if (isUser.isLeft()) {
      expect(isUser.value.name).toBe("InvalidUserError");
    }
  });
});
