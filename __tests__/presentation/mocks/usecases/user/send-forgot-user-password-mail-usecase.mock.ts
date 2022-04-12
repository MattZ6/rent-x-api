import { ISendForgotUserPasswordMailUseCase } from '@domain/usecases/user/SendForgotUserPasssordMail';

export class SendForgotUserPasswordMailUseCaseSpy
  implements ISendForgotUserPasswordMailUseCase
{
  async execute(
    _: ISendForgotUserPasswordMailUseCase.Input
  ): Promise<ISendForgotUserPasswordMailUseCase.Output> {
    // That's all folks 🐰
  }
}
