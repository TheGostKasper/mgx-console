import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MgxTableComponent } from './mgx-table.component';

@NgModule({
  declarations: [MgxTableComponent],
  imports: [CommonModule, MatTableModule, MatIconModule, FlexLayoutModule],
  exports: [MgxTableComponent],
})
export class MgxTableModule {}
