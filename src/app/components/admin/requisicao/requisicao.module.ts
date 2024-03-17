import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [RequisicaoComponent],
  imports: [CommonModule, RequisicaoRoutingModule, NgSelectModule, ComumModule],
})
export class RequisicaoModule {}
