interface ICheckIfRentExistsWithPendingPaymentByUserRepository {
  checkIfExistsWithPendingPaymentByUser(
    data: ICheckIfRentExistsWithPendingPaymentByUserRepository.Input
  ): Promise<ICheckIfRentExistsWithPendingPaymentByUserRepository.Output>;
}

namespace ICheckIfRentExistsWithPendingPaymentByUserRepository {
  export type Input = {
    user_id: string;
  };

  export type Output = boolean;
}

export { ICheckIfRentExistsWithPendingPaymentByUserRepository };
