export interface IDatabaseTransactionsProvider {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  dispose(): Promise<void>;
}
