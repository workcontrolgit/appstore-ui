import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { CatalogItem } from './catalogitem.model';
import { CatalogItemService } from './catalogitem.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';


@Component(
  {
    selector: 'ngbd-catalog', templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'], providers: [CatalogItemService, DecimalPipe]
  })
export class NgbdCatalog {
  catalogitems$: Observable<CatalogItem[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CatalogItemService) {
    this.catalogitems$ = service.catalogitems$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
