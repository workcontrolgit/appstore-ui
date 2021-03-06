import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TableRoutingModule } from './catalog-routing.module';

import { NgbdSortableHeader } from './sortable.directive';
import { NgbdCatalogComponent, NgbdModalContentComponent } from './catalog.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableRoutingModule,
    NgbModule
  ],
  declarations: [NgbdCatalogComponent, NgbdModalContentComponent, NgbdSortableHeader],
  exports: [NgbdCatalogComponent, NgbdModalContentComponent],
  bootstrap: [NgbdCatalogComponent, NgbdModalContentComponent]
})
export class NgbdCatalogModule {}
