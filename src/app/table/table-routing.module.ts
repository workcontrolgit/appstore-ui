import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { NgbdTable } from './table.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'table', component: NgbdTable, data: { title: extract('About') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TableRoutingModule { }