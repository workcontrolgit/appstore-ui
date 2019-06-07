import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { CatalogItem } from './catalogitem.model';
import { CatalogItemService } from './catalogitem.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Hi there!</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>You clicked on {{name}}.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name: any;
  public isCollapsed = false;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component(
  {
    selector: 'ngbd-catalog', templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'], providers: [CatalogItemService, DecimalPipe]
  })
export class NgbdCatalog {
  catalogitems$: Observable<CatalogItem[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CatalogItemService, private modalService: NgbModal) {
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

  // RowSelected(item:any){
  //   console.log(item);
  //   window.location.href="http://www.google.com";
  //   }

    open(item:any) {
      const modalRef = this.modalService.open(NgbdModalContent, { size: 'sm' });
      modalRef.componentInstance.name = item.name;
    }    

}
