import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EcommerceComponent } from './ecommerce.component';
import { RecordsComponent } from './records/records.component';
import { GenresComponent } from './genres/genres.component';
import { GroupsComponent } from './groups/groups.component';
// import { GenresService } from './services/genres.services';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { EcommerceService } from './ecommerce.service';

@NgModule({
  declarations: [
    EcommerceComponent,
    RecordsComponent,
    GenresComponent,
    GroupsComponent
  ],
  imports: [
    CommonModule, EcommerceRoutingModule, SharedModule,
    FormsModule, TableModule, ButtonModule,
    ConfirmDialogModule, DialogModule, HttpClientModule
  ],
  // providers: [GenresService]
  providers: [EcommerceService]
})
export class EcommerceModule { }
