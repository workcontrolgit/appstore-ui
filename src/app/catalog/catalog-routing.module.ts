import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { NgbdCatalogComponent } from './catalog.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'catalog', component: NgbdCatalogComponent, data: { title: extract('Catalog') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TableRoutingModule {
}
