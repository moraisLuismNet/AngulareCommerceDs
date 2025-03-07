import { Routes, RouterModule } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';
import { GenresComponent } from './genres/genres.component';
import { NgModule } from '@angular/core';
import { GroupsComponent } from './groups/groups.component';

const appRoutes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      // { path: '', redirectTo: '/ecommerce/genres', pathMatch: 'full' },
      { path: 'genres', component: GenresComponent },
      { path: 'groups', component: GroupsComponent }
      // { path: 'books', component: BooksComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule {}
