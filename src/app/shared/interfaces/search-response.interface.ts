export interface ISearchResponse {
  items: ISearchItem[];
  pages: number;
  total: number;
  size: number;
}

export interface ISearchItem {
  id: string;
  name: string;
  url: string;
  service_type: string;
  type: string;
  annotation: string;
  haystack: string;
  highlight: {
    annotation: string[];
    name: string[];
    tags: string[];
  };
}
