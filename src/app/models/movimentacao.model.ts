import { Model } from '../core/model';
import { Funcionario } from './funcionario.model';

export class Movimentacao extends Model {
  funcionario: Funcionario = {} as Funcionario;
  dataHora: Date = new Date();
  status: string = '';
  descricao: string = '';
}
