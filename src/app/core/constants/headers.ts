import { HttpHeaders } from '@angular/common/http';
import { apiKey } from './api';

export const headers = new HttpHeaders({
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
  'Api-Key': apiKey,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Pragma: 'no-cache'
});
