import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MgxMultiSelectModule } from 'mgx-multi-select';
import { MgxLoadingAndErrorModule } from 'mgx-loading-and-error';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MgxMultiSelectModule,
    MgxLoadingAndErrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
