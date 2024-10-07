import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISearchBody, ISearchResponse } from '../interfaces';
import { apiUrl, headers } from '@core/constants';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _http = inject(HttpClient);

  search(query: string): Observable<ISearchResponse> {
    const body: ISearchBody = {
      fuzzy: false,
      autocomplete: false,
      normalize: true,
      fuzziness: 0,
      connectorIds: [],
      q: query,
      size: 6,
      page: 1
    };

    return this._http.post<ISearchResponse>(apiUrl, body, { headers });
  }
}
