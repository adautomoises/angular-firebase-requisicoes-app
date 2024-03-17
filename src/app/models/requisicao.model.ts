import { Model } from '../core/model';
import { Departamento } from './departamento.model';
import { Funcionario } from './funcionario.model';
import { Movimentacao } from './movimentacao.model';

export class Requisicao extends Model {
  solicitante: Funcionario = {} as Funcionario;
  dataAbertura: any;
  ultimaAtualizacao: any;
  descricao: string = '';
  status: string = '';
  destino: Departamento = {} as Departamento;
  movimentacoes: Movimentacao[] = [] as Movimentacao[];
}
