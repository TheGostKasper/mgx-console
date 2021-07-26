import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MgxLoadingAndErrorComponent } from './mgx-loading-and-error.component';

@NgModule({
  declarations: [MgxLoadingAndErrorComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [MgxLoadingAndErrorComponent],
})
export class MgxLoadingAndErrorModule {}
