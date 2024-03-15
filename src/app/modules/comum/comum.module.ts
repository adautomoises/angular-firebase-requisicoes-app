import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';

@NgModule({
  imports: [CommonModule, FormsModule, PrimeNGModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNGModule],
  declarations: [],
})
export class ComumModule {}
