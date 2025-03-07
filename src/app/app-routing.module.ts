import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenresComponent } from './ecommerce/genres/genres.component';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { GroupsComponent } from './ecommerce/groups/groups.component';

const canActivate = () => inject(AuthGuard).isLoggedIn();

const appRoutes: Routes = [
  { path: '', component: GenresComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'ecommerce',
    loadChildren: () =>
      import('./ecommerce/ecommerce.module').then(
        (m) => m.EcommerceModule
      ),
    canActivate: [canActivate],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
