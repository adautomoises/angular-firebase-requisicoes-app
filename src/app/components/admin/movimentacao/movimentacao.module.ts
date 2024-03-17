import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MovimentacaoRoutingModule,
    NgSelectModule,
    ComumModule,
  ],
})
export class MovimentacaoModule {}
