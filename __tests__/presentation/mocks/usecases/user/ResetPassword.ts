import { IResetUserPasswordUseCase } from '@domain/usecases/user/ResetPassword';

export class ResetUserPasswordUseCaseSpy implements IResetUserPasswordUseCase {
  async execute(
    _: IResetUserPasswordUseCase.Input
  ): Promise<IResetUserPasswordUseCase.Output> {
    // That's all folks 🐷
  }
}
