export interface ISearchBody {
  fuzzy: boolean;
  autocomplete: boolean;
  normalize: boolean;
  fuzziness: number;
  connectorIds: number[];
  q: string;
  size: number;
  page: number;
}
