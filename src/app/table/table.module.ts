import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TableRoutingModule } from './table-routing.module';

import { NgbdSortableHeader } from './sortable.directive';
import { NgbdTable } from './table.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableRoutingModule,
    NgbModule
  ],
  declarations: [NgbdTable, NgbdSortableHeader],
  exports: [NgbdTable],
  bootstrap: [NgbdTable]
})
export class NgbdTableModule {}
