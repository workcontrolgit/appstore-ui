import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {CatalogItem} from './catalogitem.model';
import {CatalogItems} from './catalogitem.mockdata';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from './sortable.directive';

interface SearchResult {
  catalogitems: CatalogItem[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1: any, v2: any) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(catalogitems: CatalogItem[], column: string, direction: string): CatalogItem[] {
  if (direction === '') {
    return catalogitems;
  } else {
    return [...catalogitems].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(item: CatalogItem, term: string, pipe: PipeTransform) {
  return item.name.toLowerCase().includes(term)
    || item.description.toLowerCase().includes(term)
    || item.category.toLowerCase().includes(term);
}

@Injectable({providedIn: 'root'})
export class CatalogItemService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _catalogitems$ = new BehaviorSubject<CatalogItem[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._catalogitems$.next(result.catalogitems);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get catalogitems$() { return this._catalogitems$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let catalogitems = sort(CatalogItems, sortColumn, sortDirection);

    // 2. filter
    catalogitems = catalogitems.filter(item => matches(item, searchTerm, this.pipe));
    const total = catalogitems.length;

    // 3. paginate
    catalogitems = catalogitems.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({catalogitems, total});
  }
}
