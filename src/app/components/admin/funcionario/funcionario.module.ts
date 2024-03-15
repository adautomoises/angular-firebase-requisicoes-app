import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComumModule } from 'src/app/modules/comum/comum.module';

@NgModule({
  declarations: [FuncionarioComponent],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NgSelectModule,
    ComumModule,
  ],
})
export class FuncionarioModule {}
