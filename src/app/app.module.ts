import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GenresService } from './ecommerce/services/genres.service';
import { GroupsService } from './ecommerce/services/groups.service';
import { RecordsService } from './ecommerce/services/records.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EcommerceModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [
    GenresService, GroupsService, RecordsService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
