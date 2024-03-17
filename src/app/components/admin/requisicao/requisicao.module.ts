import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MovimentacaoComponent } from '../movimentacao/movimentacao.component';
import { ListaComponent } from '../movimentacao/lista/lista.component';

@NgModule({
  declarations: [RequisicaoComponent, MovimentacaoComponent, ListaComponent],
  imports: [CommonModule, RequisicaoRoutingModule, NgSelectModule, ComumModule],
})
export class RequisicaoModule {}
