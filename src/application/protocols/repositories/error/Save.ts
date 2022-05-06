import { Error } from '@domain/entities/Error';

namespace ISaveErrorRepository {
  export type Input = Pick<
    Error,
    'stack' | 'resource_uri' | 'http_method' | 'thrown_at'
  >;

  export type Output = Error;
}

interface ISaveErrorRepository {
  save(data: ISaveErrorRepository.Input): Promise<ISaveErrorRepository.Output>;
}

export { ISaveErrorRepository };
