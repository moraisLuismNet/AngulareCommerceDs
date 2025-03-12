import { Routes, RouterModule } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';
import { GenresComponent } from './genres/genres.component';
import { NgModule } from '@angular/core';
import { GroupsComponent } from './groups/groups.component';
import { RecordsComponent } from './records/records.component';
import { ListgroupsComponent } from './listgroups/listgroups.component';
import { ListrecordsComponent } from './listrecords/listrecords.component';

const appRoutes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      { path: '', component: ListgroupsComponent },
      { path: 'listrecords/:idGroup', component: ListrecordsComponent },
      { path: 'genres', component: GenresComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'records', component: RecordsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule {}
