import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, takeUntil, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { SearchService } from '@services/index';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ISearchResponse } from '@interfaces/index';

const INITIAL_SEARCH_RESPONSE: ISearchResponse = {
  items: [],
  pages: 0,
  total: 0,
  size: 0
};

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl<string>('');
  isLoading = new BehaviorSubject<boolean>(false);
  private _destroy = new Subject<void>();
  private _hasSearched = new BehaviorSubject<boolean>(false);
  private _searchResultsSubject = new BehaviorSubject<ISearchResponse>(INITIAL_SEARCH_RESPONSE);
  searchResults$: Observable<ISearchResponse> = this._searchResultsSubject.asObservable();
  hasSearched$ = this._hasSearched.asObservable();

  private _searchService = inject(SearchService);

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        tap((value) => {
          if (!value || value.length < 3) {
            this._hasSearched.next(false);
            this._searchResultsSubject.next(INITIAL_SEARCH_RESPONSE);
          }
        }),
        filter((value): value is string => !!value && value.trim().length >= 3),
        tap(() => this.isLoading.next(true)),
        switchMap((query) =>
          this._searchService.search(query).pipe(
            tap(() => this._hasSearched.next(true)),
            catchError(() => {
              this.isLoading.next(false);
              throw throwError(() => 'Ошибка при выполнении запроса');
            })
          )
        ),
        takeUntil(this._destroy)
      )
      .subscribe((results) => {
        this._searchResultsSubject.next(results);
        this.isLoading.next(false);
      });
  }

  onResultClick(url: string): void {
    window.open(url, '_blank');
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
