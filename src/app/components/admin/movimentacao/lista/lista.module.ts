import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRoutingModule } from './lista-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComumModule } from 'src/app/modules/comum/comum.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ListaRoutingModule, NgSelectModule, ComumModule],
})
export class ListaModule {}
