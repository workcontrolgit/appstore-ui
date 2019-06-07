import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { NgbdCatalog } from './catalog.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'catalog', component: NgbdCatalog, data: { title: extract('Catalog') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TableRoutingModule { 
  
}