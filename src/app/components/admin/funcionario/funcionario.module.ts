import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';

@NgModule({
  declarations: [FuncionarioComponent],
  imports: [CommonModule, FuncionarioRoutingModule, ComumModule],
})
export class FuncionarioModule {}
