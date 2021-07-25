import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MgxMultiSelectComponent } from './mgx-multi-select.component';


@NgModule({
  declarations: [MgxMultiSelectComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [MgxMultiSelectComponent],
  entryComponents: [MgxMultiSelectComponent],
})
export class MgxMultiSelectModule {}
