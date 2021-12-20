export type CompareHashDTO = {
  value: string;
  value_to_compare: string;
};

export interface ICompareHashProvider {
  compare(data: CompareHashDTO): Promise<boolean>;
}
