import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRippleModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatCardModule,
  MatSortModule,
} from '@angular/material';

const material = [ MatButtonModule, MatToolbarModule, MatListModule, MatIconModule, MatTableModule, MatFormFieldModule,
  MatInputModule, MatSelectModule, MatRippleModule,MatPaginatorModule, MatDialogModule, MatTooltipModule,
  MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatSnackBarModule, MatCheckboxModule, MatCardModule, MatSortModule
];
@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
