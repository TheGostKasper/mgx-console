import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MgxMultiSelectComponent } from './mgx-multi-select.component';
import {
  MgxSelectViewComponent,
  MgxSavedItemsViewComponent,
} from './select-view/mgx-select-view.component';

@NgModule({
  declarations: [
    MgxMultiSelectComponent,
    MgxSelectViewComponent,
    MgxSavedItemsViewComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  exports: [MgxMultiSelectComponent],
  entryComponents: [MgxMultiSelectComponent],
})
export class MgxMultiSelectModule {}
