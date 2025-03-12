import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EcommerceComponent } from './ecommerce.component';
import { RecordsComponent } from './records/records.component';
import { GenresComponent } from './genres/genres.component';
import { GroupsComponent } from './groups/groups.component';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { GenresService } from './services/genres.service';
import { GroupsService } from './services/groups.service';
import { RecordsService } from './services/records.service';
import { ListgroupsComponent } from './listgroups/listgroups.component';
import { ListrecordsComponent } from './listrecords/listrecords.component';

@NgModule({
  declarations: [
    EcommerceComponent,
    RecordsComponent,
    GenresComponent,
    GroupsComponent,
    ListgroupsComponent,
    ListrecordsComponent
  ],
  imports: [
    CommonModule, EcommerceRoutingModule, SharedModule,
    FormsModule, TableModule, ButtonModule,
    ConfirmDialogModule, DialogModule, HttpClientModule
  ],
  providers: [
    GenresService,
    GroupsService,
    RecordsService
  ]
})
export class EcommerceModule { }
