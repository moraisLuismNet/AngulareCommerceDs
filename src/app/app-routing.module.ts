import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ListgroupsComponent } from './ecommerce/listgroups/listgroups.component';
import { ListrecordsComponent } from './ecommerce/listrecords/listrecords.component';

const canActivate = () => inject(AuthGuard).isLoggedIn();

const appRoutes: Routes = [
  { path: '', component: ListgroupsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listgroups', component: ListgroupsComponent },
  { path: 'listrecords/:idGroup', component: ListrecordsComponent },
  { path: '**', redirectTo: '' },
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
